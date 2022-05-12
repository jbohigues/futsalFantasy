import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorReal } from 'src/app/interfaces/jugador-real';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Puja } from 'src/app/interfaces/traspaso';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';
import { Jugadores } from '../principal-alineacion/principal-alineacion.component';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss'],
})
export class PlantillaComponent implements OnInit {
  titular: boolean = false;
  valor: number = 0;
  valorString: string = '';
  misJugadores: any = [];
  jugadores: Jugadores[] = [];
  jugadorVenta!: JugadorRealEnCadaLiga;
  traspaso!: Puja;
  @Input() miEquipo!: EquipoUser;
  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
  imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';

  //TABLA
  displayedColumns: string[] = [
    'jugador',
    'estado',
    'posicion',
    'alias',
    'capital',
    'puntos',
    'accion',
  ];
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private traspasosService: TraspasosService
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    //Me guardo en un array los jugadores del equipo del usuario logueado
    this.miEquipo.jugadoresrealesencadaliga.forEach((element) => {
      this.titular = element.titular;
      this.misJugadores.push(element.jugadoresreales);
    });

    //Guardo en un array los jugadores con el formato Jugadores
    this.misJugadores.forEach((jugador: JugadorReal) => {
      this.jugadores.push({
        id: jugador.id,
        jugador: jugador.foto,
        estado: jugador.estado,
        posicion: jugador.posicion,
        alias: jugador.alias,
        puntos: jugador.puntos,
        capital: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(jugador.valorMercado),
        titular: this.titular,
      });
      this.valor += jugador.valorMercado;
    });

    this.valorString = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.valor);

    this.dataSource = new MatTableDataSource<Jugadores>(this.jugadores);
    this.dataSource.sort = this.sort;
  }

  abrirModal(id: number) {
    console.log(id);

    this.miEquipo.jugadoresrealesencadaliga.forEach(
      (jugador: JugadorRealEnCadaLiga) => {
        if (id === jugador.idJugadorReal) this.jugadorVenta = jugador;
      }
    );

    console.log(this.jugadorVenta);

    const dialogRef = this.dialog.open(DialogVentaComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        jugadorVenta: this.jugadorVenta,
      },
    });

    dialogRef.afterClosed().subscribe((precioVenta) => {
      console.log(`Dialog result: ${precioVenta}`);
      if (precioVenta != undefined) {
        this.traspaso = {
          idJugador: this.jugadorVenta.jugadoresreales.id,
          idEquipoUserEmisor:
            this.miEquipo.jugadoresrealesencadaliga[0].idEquipoUser,
          idEquipoUserReceptor: this.jugadorVenta.idEquipoUser,
          precio: precioVenta,
        };
        this.traspasosService
          .pujarPorJugador(this.traspaso)
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }
}
