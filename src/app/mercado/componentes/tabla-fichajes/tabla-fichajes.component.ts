import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { Traspaso, Estado, Puja } from 'src/app/interfaces/traspaso';

export interface Jugadores {
  id: number;
  jugador: string;
  equipoReal: string;
  posicion: string;
  alias: string;
  estado: string;
  propietario: string;
  nombreEquipoUser: string;
  puntos: number;
  valor: string;
  precioVenta: string;
  titular: boolean;
}

@Component({
  selector: 'app-tabla-fichajes',
  templateUrl: './tabla-fichajes.component.html',
  styleUrls: ['./tabla-fichajes.component.scss'],
})
export class TablaFichajesComponent implements OnInit {
  jugadoresMercado: JugadorRealEnCadaLiga[] = [];
  jugadores: Jugadores[] = [];
  jugadorPuja!: JugadorRealEnCadaLiga;
  loading: boolean = true;
  foto: string = '';
  nombreEquipoUser: string = '';
  valorMercado: string = '';
  dinero: number = 0;
  pujaRealizada: number = 0;
  traspaso!: Traspaso;
  puja!: Puja;
  @Input() miEquipo!: EquipoUser;

  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
  imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';
  equipoRealLogo: string = 'http://localhost:3000/images/logosEquiposReales/';
  equipoUserLogo: string = 'http://localhost:3000/images/logosEquiposUsers/';

  //TABLA
  displayedColumns: string[] = [
    'jugador',
    'equipoReal',
    'posicion',
    'alias',
    'estado',
    'propietario',
    'puntos',
    'valor',
    'precioVenta',
  ];
  dataSource: any;

  constructor(
    private jugadoresRealesService: JugadoresRealesService,
    private localStorage: LocalStorageService,
    public dialog: MatDialog,
    private traspasosService: TraspasosService
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    this.miEquipo = this.localStorage.getEquipoLocalStorage();
    console.log(this.miEquipo);

    this.dinero = this.miEquipo.dinero;

    this.jugadoresRealesService
      .getJugadoresMercado(this.miEquipo.idLiga)
      .subscribe((res) => {
        this.jugadoresMercado = res;
        this.jugadoresMercado.forEach((jugador) => {
          //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
          if (jugador.idEquipoUser === null) {
            this.foto = 'logoMercado';
            this.nombreEquipoUser = 'mercado';
          } else {
            this.foto = jugador.equiposusuarios.foto;
            this.nombreEquipoUser = jugador.equiposusuarios.nombre;
          }

          //Si no tiene valor de transferencia, significa que es de Mercado, así que su precio de venta sera el mismo que el valor del jugador
          if (jugador.valorTransferencia === null)
            this.valorMercado = new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0,
              currencySign: 'accounting',
            }).format(jugador.jugadoresreales.valorMercado);
          else
            this.valorMercado = new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0,
              currencySign: 'accounting',
            }).format(jugador.valorTransferencia);

          this.jugadores.push({
            id: jugador.idJugadorReal,
            jugador: jugador.jugadoresreales.foto,
            equipoReal: jugador.jugadoresreales.equiposreales.foto,
            posicion: jugador.jugadoresreales.posicion,
            alias: jugador.jugadoresreales.alias,
            estado: jugador.jugadoresreales.estado,
            propietario: this.foto,
            nombreEquipoUser: this.nombreEquipoUser.toUpperCase(),
            puntos: jugador.jugadoresreales.puntos,
            titular: jugador.titular,
            precioVenta: this.valorMercado,
            valor: new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0,
              currencySign: 'accounting',
            }).format(jugador.jugadoresreales.valorMercado),
          });
        });

        this.dataSource = new MatTableDataSource<JugadorRealEnCadaLiga>(
          this.jugadoresMercado
        );
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
  }

  abrirModal(id: number) {
    this.jugadoresMercado.forEach((jugador) => {
      if (id === jugador.idJugadorReal) this.jugadorPuja = jugador;
    });

    console.log(this.jugadorPuja);

    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        jugadorPuja: this.jugadorPuja,
        pujaMaxima: this.dinero + this.dinero * 0.25,
      },
    });

    dialogRef.afterClosed().subscribe((pujaNumber) => {
      console.log(`Dialog result: ${pujaNumber}`);

      // this.pujaRealizada = pujaNumber;

      this.traspaso = {
        id: 0,
        idJugador: this.jugadorPuja.jugadoresreales.id,
        idEquipoUserEmisor:
          this.miEquipo.jugadoresrealesencadaliga[0].idEquipoUser,
        idEquipoUserReceptor: this.jugadorPuja.idEquipoUser,
        precio: pujaNumber,
        estado: Estado.Pendiente,
      };
      console.log(this.traspaso);

      this.traspasosService
        .comprobarExistePuja(
          this.traspaso.idJugador,
          this.traspaso.idEquipoUserEmisor
        )
        .subscribe((res) => {
          console.log(res);

          if (res.status == 'noHayJugador') {
            this.puja = {
              idEquipoUserEmisor: this.traspaso.idEquipoUserEmisor,
              idEquipoUserReceptor: this.traspaso.idEquipoUserReceptor,
              idJugador: this.traspaso.idJugador,
              precio: this.traspaso.precio,
            };
            this.traspasosService
              .pujarPorJugador(this.puja)
              .subscribe((res) => {
                alert('Has pujado con exito');
              });
          } else {
            this.traspaso.id = res.traspaso.id;
            // console.log('no se puere');

            this.traspasosService
              .actualizarPuja(this.traspaso)
              .subscribe((res) => {
                alert('puja actualizada');
              });

            // FALTA QUE PUEDA RETIRAR LA PUJA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }
        });
    });
  }
}
