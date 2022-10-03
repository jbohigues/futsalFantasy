import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';
import { Jugadores } from 'src/app/mercado/componentes/tabla-fichajes/tabla-fichajes.component';
import { Jugadores2 } from '../principal-alineacion/principal-alineacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';

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
  jugadores: any[] = [];
  jugadorVenta!: JugadorRealEnCadaLiga;
  jugadorParaVender!: JugadorRealEnCadaLiga;
  jugadorPujaFormateado!: Jugadores;
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
    private _snackBar: MatSnackBar,
    private jugadoresRealesService: JugadoresRealesService
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    //Me guardo en un array los jugadores del equipo del usuario logueado
    this.miEquipo.jugadoresrealesencadaliga.forEach((element: any) => {
      this.titular = element.titular;
      if (element.titular) element.jugadoresreales.claseTitular = 'titular';
      else element.jugadoresreales.claseTitular = '';
      this.misJugadores.push(element.jugadoresreales);
    });

    //Guardo en un array los jugadores con el formato Jugadores
    this.misJugadores.forEach((jugador: any) => {
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
        precioVenta: null,
        claseTitular: jugador.claseTitular,
      });
      this.valor += jugador.valorMercado;
    });

    //Formateo aquellos que están en venta y los titulares
    this.jugadores.forEach((jugador) => {
      this.jugadoresRealesService
        .getInfoJugador(jugador.id, this.miEquipo.idLiga)
        .subscribe((res) => {
          if (res.mercado === true) {
            jugador.clasePuja = 'enVenta';
            jugador.hayPuja = true;
            jugador.precioVenta = res.valorTransferencia;
          }
        });
    });

    //Formateo el valor del equipo
    this.valorString = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.valor);

    this.dataSource = new MatTableDataSource<Jugadores2>(this.jugadores);
    this.dataSource.sort = this.sort;
  }

  //Abre dialog para realizar operaciones con el jugador seleccionado
  abrirModal(element: Jugadores) {
    this.jugadorPujaFormateado = element;
    //Obtengo el jugador que voy a vender
    for (const jugador of this.misJugadores) {
      if (this.jugadorPujaFormateado.id === jugador.id) {
        this.jugadorVenta = jugador;
        break;
      }
    }

    const dialogRef = this.dialog.open(DialogVentaComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        precioVenta: this.jugadorPujaFormateado.precioVenta,
        hayPuja: this.jugadorPujaFormateado.hayPuja,
        jugadorVenta: this.jugadorVenta,
        propietario: this.miEquipo,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.tipoPuja != 'cancel') {
        //Obtenemos la informacion del jugador real
        this.jugadoresRealesService
          .getInfoJugador(data.jugadorVenta.id, this.miEquipo.idLiga)
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
