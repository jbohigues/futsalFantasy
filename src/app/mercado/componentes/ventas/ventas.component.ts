import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogVentaComponent } from 'src/app/alineacion/componentes/dialog-venta/dialog-venta.component';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Puja, Traspaso } from 'src/app/interfaces/traspaso';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  jugadoresMercado: JugadorRealEnCadaLiga[] = [];
  jugadores: any[] = [];
  misPujas: Jugadores[] = [];
  jugadorVenta!: JugadorRealEnCadaLiga;
  jugadorParaVender!: JugadorRealEnCadaLiga;
  jugadorPujaFormateado!: Jugadores;
  loading: boolean = true;
  foto: string = '';
  nombreEquipoUser: string = '';
  valorMercado: string = '';
  dinero: number = 0;
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
    private traspasosService: TraspasosService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit() {
    //Obtengo mi equipo
    this.miEquipo = this.localStorage.getEquipoLocalStorage();
    //Obtengo el capital de mi equipo
    this.dinero = this.miEquipo.dinero;

    //Obtengo la lista de jugadores a los que he pujado
    this.traspasosService
      .getMisPujas(this.miEquipo.idUsuario)
      .subscribe((res) => {
        this.misPujas = res.traspaso;
      });

    //Obtengo los jugadores puestos en el mercado de fichajes
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

          //Guardo todos los jugadores del mercado que el usuario logueado haya puesto en venta
          if (jugador.idEquipoUser === this.miEquipo.id) {
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
              clasePuja: 'enVenta',
              hayPuja: false,
              precioMiPuja: 0,
              idTraspaso: 0,
            });
          }
        });

        this.dataSource = new MatTableDataSource<Jugadores>(this.jugadores);
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
  }

  abrirModal(element: Jugadores) {
    this.jugadorPujaFormateado = element;

    for (const jugador of this.jugadoresMercado) {
      if (this.jugadorPujaFormateado.id === jugador.idJugadorReal) {
        this.jugadorVenta = jugador;
        break;
      }
    }

    const dialogRef = this.dialog.open(DialogVentaComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        precioPuja: this.jugadorPujaFormateado.precioMiPuja,
        hayPuja: this.jugadorPujaFormateado.hayPuja,
        jugadorVenta: this.jugadorVenta,
        propietario: this.miEquipo,
        vista: 'mercado',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.tipoPuja != 'cancel') {
        if (data.vista === 'mercado') {
          //Obtenemos la informacion del jugador real
          this.jugadoresRealesService
            .getInfoJugador(data.jugadorVenta.idJugadorReal)
            .subscribe((res) => {
              //Retirar jugador de la venta
              if (data.tipoPuja === 'retirar') {
                //Lo ponemos con la interfaz deseada y cambiamos los valores
                this.jugadorParaVender = {
                  ...res,
                  mercado: false,
                  valorTransferencia: null,
                };

                //Quitamos al jugador del mercado
                this.jugadoresRealesService
                  .modificarJugadorVenta(
                    this.miEquipo.idLiga,
                    this.jugadorParaVender
                  )
                  .subscribe((res2) => {
                    if (res2.status === 'exito') {
                      this.jugadores.forEach((jugador) => {
                        if (jugador.id === res2.jugador.idJugadorReal) {
                          this.openSnackBar(
                            'Se ha eliminado a ' +
                              jugador.alias.toUpperCase() +
                              ' del mercado de fichajes'
                          );
                        }
                      });
                      //Mensaje de error
                    } else
                      this.openSnackBar(
                        'No se ha podido poner al jugador en el mercado'
                      );
                  });

                //Poner jugador a la venta
              } else {
                //Lo ponemos con la interfaz deseada y cambiamos los valores
                this.jugadorParaVender = {
                  ...res,
                  mercado: true,
                  valorTransferencia: data.precioVenta,
                };

                //Ponemos a la venta el jugador
                this.jugadoresRealesService
                  .modificarJugadorVenta(
                    this.miEquipo.idLiga,
                    this.jugadorParaVender
                  )
                  .subscribe((res3) => {
                    //Mensaje de exito
                    if (res3.status === 'exito') {
                      this.jugadores.forEach((jugador) => {
                        if (jugador.id === res3.jugador.idJugadorReal) {
                          jugador.hayPuja = true;
                          jugador.clasePuja = 'enVenta';
                          jugador.precioVenta = res3.jugador.valorTransferencia;
                          this.openSnackBar(
                            jugador.alias.toUpperCase() +
                              ' ha sido añadido al mercado de fichajes'
                          );
                        }
                      });
                      //Mensaje de error
                    } else
                      this.openSnackBar(
                        'No se ha podido poner al jugador en el mercado'
                      );
                  });
              }
              this.router
                .navigateByUrl('/alineacion', {
                  skipLocationChange: true,
                })
                .then(() => this.router.navigate(['mercado']));
            });
        } else {
          //Obtenemos la informacion del jugador real
          this.jugadoresRealesService
            .getInfoJugador(data.jugadorVenta.id)
            .subscribe((res) => {
              //Retirar jugador de la venta
              if (data.tipoPuja === 'retirar') {
                //Lo ponemos con la interfaz deseada y cambiamos los valores
                this.jugadorParaVender = {
                  ...res,
                  mercado: false,
                  valorTransferencia: null,
                };
                //Quitamos al jugador del mercado
                this.jugadoresRealesService
                  .modificarJugadorVenta(
                    this.miEquipo.idLiga,
                    this.jugadorParaVender
                  )
                  .subscribe((res2) => {
                    if (res2.status === 'exito') {
                      this.jugadores.forEach((jugador) => {
                        if (jugador.id === res2.jugador.idJugadorReal) {
                          jugador.hayPuja = false;
                          jugador.clasePuja = '';
                          jugador.precioVenta = null;
                          this.openSnackBar(
                            'Se ha eliminado a ' +
                              jugador.alias.toUpperCase() +
                              ' del mercado de fichajes'
                          );
                        }
                      });
                      //Mensaje de error
                    } else
                      this.openSnackBar(
                        'No se ha podido poner al jugador en el mercado'
                      );
                  });

                //Poner jugador a la venta
              } else {
                //Lo ponemos con la interfaz deseada y cambiamos los valores
                this.jugadorParaVender = {
                  ...res,
                  mercado: true,
                  valorTransferencia: data.precioVenta,
                };
                //Ponemos a la venta el jugador
                this.jugadoresRealesService
                  .modificarJugadorVenta(
                    this.miEquipo.idLiga,
                    this.jugadorParaVender
                  )
                  .subscribe((res2) => {
                    //Mensaje de exito
                    if (res2.status === 'exito') {
                      this.jugadores.forEach((jugador) => {
                        if (jugador.id === res2.jugador.idJugadorReal) {
                          jugador.hayPuja = true;
                          jugador.clasePuja = 'enVenta';
                          jugador.precioVenta = res2.jugador.valorTransferencia;
                          this.openSnackBar(
                            jugador.alias.toUpperCase() +
                              ' ha sido añadido al mercado de fichajes'
                          );
                        }
                      });
                      //Mensaje de error
                    } else
                      this.openSnackBar(
                        'No se ha podido poner al jugador en el mercado'
                      );
                  });
              }
            });
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
