import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Estado, Puja, Traspaso } from 'src/app/interfaces/traspaso';
import { DialogComponent } from '../dialog/dialog.component';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-mis-pujas',
  templateUrl: './mis-pujas.component.html',
  styleUrls: ['./mis-pujas.component.scss'],
})
export class MisPujasComponent implements OnInit {
  jugadoresMercado: any[] = [];
  jugadores: Jugadores[] = [];
  jugadorPuja!: JugadorRealEnCadaLiga;
  jugadorPujaFormateado!: Jugadores;
  loading: boolean = true;
  foto: string = '';
  nombreEquipoUser: string = '';
  dinero: number = 0;
  traspaso!: Traspaso;
  puja!: Puja;
  miPujaFormateada!: string;
  precioVenta: number = 0;
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
    private traspasosService: TraspasosService,
    private equiposUserService: EquiposUserService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    //Obtengo mi equipo
    this.miEquipo = this.localStorage.getEquipoLocalStorage();
    //Obtengo el capital de mi equipo
    this.dinero = this.miEquipo.dinero;
    //Obtengo la lista de jugadores a los que he pujado
    this.traspasosService
      .getMisPujas(this.miEquipo.idUsuario)
      .subscribe((res) => {
        this.jugadoresMercado = res.traspaso;

        this.jugadoresMercado.forEach((jugador) => {
          console.log(jugador);
          this.jugadoresRealesService
            .getInfoJugador(jugador.idJugador)
            .subscribe((res2) => {
              console.log(res2);

              //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
              if (jugador.idEquipoUserReceptor === null) {
                this.foto = 'logoMercado';
                this.nombreEquipoUser = 'mercado';
              } else {
                this.foto =
                  jugador.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserReceptor.foto;
                this.nombreEquipoUser =
                  jugador.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserReceptor.nombre;
              }

              //Formateamos el valor de transferencia
              if (res2.valorTransferencia === null) {
                this.miPujaFormateada = new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                  currencySign: 'accounting',
                }).format(jugador.precio);
              } else {
                this.miPujaFormateada = new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                  currencySign: 'accounting',
                }).format(res2.valorTransferencia);
              }
              this.jugadores.push({
                id: jugador.jugadoresreales.id,
                jugador: jugador.jugadoresreales.foto,
                equipoReal: jugador.jugadoresreales.equiposreales.foto,
                posicion: jugador.jugadoresreales.posicion,
                alias: jugador.jugadoresreales.alias,
                estado: jugador.jugadoresreales.estado,
                propietario: this.foto,
                nombreEquipoUser: this.nombreEquipoUser.toUpperCase(),
                puntos: jugador.jugadoresreales.puntos,
                titular: jugador.titular,
                precioVenta: this.miPujaFormateada,
                valor: new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                  maximumFractionDigits: 0,
                  currencySign: 'accounting',
                }).format(jugador.jugadoresreales.valorMercado),
                clasePuja: '',
                hayPuja: false,
                precioMiPuja: 0,
                idTraspaso: 0,
              });
              this.jugadores.forEach((jugador) => {
                this.traspasosService
                  .comprobarExistePuja(jugador.id, this.miEquipo.id)
                  .subscribe((res2) => {
                    if (res2.status === 'hayJugador') {
                      jugador.clasePuja = 'hayPuja';
                      jugador.hayPuja = true;
                      jugador.precioMiPuja = res2.traspaso.precio;
                      jugador.idTraspaso = res2.traspaso.id;
                    } else {
                      jugador.clasePuja = '';
                      jugador.hayPuja = false;
                    }
                  });
              });

              this.dataSource = new MatTableDataSource<Jugadores>(
                this.jugadores
              );
              this.dataSource.sort = this.sort;
              this.loading = false;
            });
        });
      });
  }

  abrirModal(element: Jugadores) {
    this.jugadorPujaFormateado = element;
    console.log(this.jugadorPujaFormateado);

    for (const jugador of this.jugadoresMercado) {
      console.log(jugador);

      if (this.jugadorPujaFormateado.id === jugador.idJugador) {
        this.jugadorPuja = jugador;
        break;
      }
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        precioPuja: this.jugadorPujaFormateado.precioMiPuja,
        hayPuja: this.jugadorPujaFormateado.hayPuja,
        jugadorPuja: this.jugadorPuja,
        pujaMaxima: this.dinero + this.dinero * 0.25,
        vista: 'misPujas',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      //Si lo que recibo del dialog tiene valores y no pulso sobre cancelar, creo una instancia de traspaso
      if (data != undefined && data.tipoPuja != 'cancel') {
        this.traspaso = {
          id: 0,
          idJugador: data.jugadorPuja.idJugadorReal,
          idEquipoUserEmisor:
            this.miEquipo.jugadoresrealesencadaliga[0].idEquipoUser,
          idEquipoUserReceptor: data.jugadorPuja.idEquipoUser,
          precio: data.precioPuja,
          estado: Estado.Pendiente,
        };

        //Si he pulsado sobre retirar puja, realizo la operacion pertinente
        if (data.tipoPuja === 'retirar') {
          this.traspaso.id = this.jugadorPujaFormateado.idTraspaso;
          this.traspasosService.retirarPuja(this.traspaso).subscribe((res) => {
            if (res.status === 'puja retirada') {
              this.openSnackBar('Puja retirada con éxito');
              this.jugadorPujaFormateado.hayPuja = false;
              this.jugadorPujaFormateado.clasePuja = '';
            } else this.openSnackBar('No se ha podido retirar la puja');
          });
          //Si no he pulsado sobre retirar puja, compruebo si ya he pujado sobre este jugador para hacer update o put
        } else {
          //Si no hay puja, hago put
          if (this.jugadorPujaFormateado.hayPuja === false) {
            this.puja = {
              idEquipoUserEmisor: this.traspaso.idEquipoUserEmisor,
              idEquipoUserReceptor: this.traspaso.idEquipoUserReceptor,
              idJugador: this.traspaso.idJugador,
              precio: this.traspaso.precio,
            };
            this.traspasosService
              .pujarPorJugador(this.puja)
              .subscribe((res) => {
                if (res.status === 'hayTraspaso')
                  this.openSnackBar('Puja realizada con éxito');
                else this.openSnackBar('No se ha podido realizar la puja');
                this.jugadores.forEach((jugador) => {
                  if (jugador.id === this.puja.idJugador) {
                    jugador.idTraspaso = res.traspaso.id;
                    jugador.hayPuja = true;
                    jugador.clasePuja = 'hayPuja';
                    jugador.precioMiPuja = this.puja.precio;
                  }
                });
              });
            //Si hay puja, hago update
          } else {
            this.traspaso.id = this.jugadorPujaFormateado.idTraspaso;
            this.jugadores.forEach((jugador) => {
              if (jugador.id === this.traspaso.idJugador) {
                jugador.precioMiPuja = data.precioPuja;
              }
            });
            this.traspasosService
              .actualizarPuja(this.traspaso)
              .subscribe((res) => {
                if (res.status === 'update')
                  this.openSnackBar('Puja actualizada con éxito');
                else this.openSnackBar('No se ha podido actualizar la puja');
              });
          }
        }
      }
    });
  }

  //Muestra un mensaje
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5 * 1000,
    });
  }
}
