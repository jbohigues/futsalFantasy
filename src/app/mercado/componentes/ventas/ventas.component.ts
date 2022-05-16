import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Estado, Puja, Traspaso } from 'src/app/interfaces/traspaso';
import { DialogComponent } from '../dialog/dialog.component';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  jugadoresMercado: JugadorRealEnCadaLiga[] = [];
  jugadores: Jugadores[] = [];
  misPujas: Jugadores[] = [];
  jugadorPuja!: JugadorRealEnCadaLiga;
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
    private _snackBar: MatSnackBar
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

          //Guardo todos los jugadores del mercado, excepto los mios, que los veré en el apartado de ventas
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

// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { DialogVentaComponent } from 'src/app/alineacion/componentes/dialog-venta/dialog-venta.component';
// import { Jugadores2 } from 'src/app/alineacion/componentes/principal-alineacion/principal-alineacion.component';
// import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
// import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
// import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
// import { EquipoUser } from 'src/app/interfaces/equipo-user';
// import { JugadorReal } from 'src/app/interfaces/jugador-real';
// import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
// import { Estado, Puja, Traspaso } from 'src/app/interfaces/traspaso';
// import { DialogComponent } from '../dialog/dialog.component';
// import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

// @Component({
//   selector: 'app-ventas',
//   templateUrl: './ventas.component.html',
//   styleUrls: ['./ventas.component.scss'],
// })
// export class VentasComponent implements OnInit {
//   titular: boolean = false;
//   valor: number = 0;
//   valorString: string = '';
//   misJugadores: any = [];
//   jugadores: any[] = [];
//   jugadorVenta!: JugadorRealEnCadaLiga;
//   jugadorParaVender!: JugadorRealEnCadaLiga;
//   jugadorPujaFormateado!: Jugadores;
//   puja!: Puja;
//   traspaso!: Traspaso;
//   miEquipo!: EquipoUser;

//   imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
//   imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';
//   equipoRealLogo: string = 'http://localhost:3000/images/logosEquiposReales/';
//   equipoUserLogo: string = 'http://localhost:3000/images/logosEquiposUsers/';

//   //TABLA
//   displayedColumns: string[] = [
//     'jugador',
//     'estado',
//     'posicion',
//     'alias',
//     'capital',
//     'puntos',
//     'accion',
//   ];
//   dataSource: any;

//   constructor(
//     public dialog: MatDialog,
//     private _snackBar: MatSnackBar,
//     private jugadoresRealesService: JugadoresRealesService,
//     private localStorage: LocalStorageService
//   ) {}

//   @ViewChild(MatSort, { static: true }) sort!: MatSort;

//   ngOnInit(): void {
//     //Obtengo mi equipo
//     this.miEquipo = this.localStorage.getEquipoLocalStorage();

//     //Me guardo en un array los jugadores del equipo del usuario logueado
//     this.miEquipo.jugadoresrealesencadaliga.forEach((element) => {
//       this.titular = element.titular;
//       this.misJugadores.push(element.jugadoresreales);
//     });

//     //Guardo en un array los jugadores con el formato Jugadores
//     this.misJugadores.forEach((jugador: JugadorReal) => {
//       this.jugadores.push({
//         id: jugador.id,
//         jugador: jugador.foto,
//         estado: jugador.estado,
//         posicion: jugador.posicion,
//         alias: jugador.alias,
//         puntos: jugador.puntos,
//         capital: new Intl.NumberFormat('de-DE', {
//           style: 'currency',
//           currency: 'EUR',
//           maximumFractionDigits: 0,
//           currencySign: 'accounting',
//         }).format(jugador.valorMercado),
//         titular: this.titular,
//         precioVenta: null,
//       });
//       this.valor += jugador.valorMercado;
//     });

//     this.jugadores.forEach((jugador) => {
//       this.jugadoresRealesService
//         .getInfoJugador(jugador.id)
//         .subscribe((res) => {
//           if (res.mercado === true) {
//             jugador.clasePuja = 'enVenta';
//             jugador.hayPuja = true;
//             jugador.precioVenta = res.valorTransferencia;
//           }
//         });
//     });

//     this.valorString = new Intl.NumberFormat('de-DE', {
//       style: 'currency',
//       currency: 'EUR',
//       maximumFractionDigits: 0,
//       currencySign: 'accounting',
//     }).format(this.valor);

//     this.dataSource = new MatTableDataSource<Jugadores2>(this.jugadores);
//     this.dataSource.sort = this.sort;
//   }

//   abrirModal(element: Jugadores) {
//     this.jugadorPujaFormateado = element;
//     //Obtengo el jugador que voy a vender
//     for (const jugador of this.misJugadores) {
//       if (this.jugadorPujaFormateado.id === jugador.id) {
//         this.jugadorVenta = jugador;
//         break;
//       }
//     }

//     const dialogRef = this.dialog.open(DialogVentaComponent, {
//       panelClass: 'custom-dialog-container',
//       data: {
//         precioVenta: this.jugadorPujaFormateado.precioVenta,
//         hayPuja: this.jugadorPujaFormateado.hayPuja,
//         jugadorVenta: this.jugadorVenta,
//         propietario: this.miEquipo,
//       },
//     });

//     dialogRef.afterClosed().subscribe((data) => {
//       if (data != undefined && data.tipoPuja != 'cancel') {
//         //Obtenemos la informacion del jugador real
//         this.jugadoresRealesService
//           .getInfoJugador(data.jugadorVenta.id)
//           .subscribe((res) => {
//             //Retirar jugador de la venta
//             if (data.tipoPuja === 'retirar') {
//               //Lo ponemos con la interfaz deseada y cambiamos los valores
//               this.jugadorParaVender = {
//                 ...res,
//                 mercado: false,
//                 valorTransferencia: null,
//               };
//               //Quitamos al jugador del mercado
//               this.jugadoresRealesService
//                 .modificarJugadorVenta(
//                   this.miEquipo.idLiga,
//                   this.jugadorParaVender
//                 )
//                 .subscribe((res2) => {
//                   if (res2.status === 'exito') {
//                     this.jugadores.forEach((jugador) => {
//                       if (jugador.id === res2.jugador.idJugadorReal) {
//                         jugador.hayPuja = false;
//                         jugador.clasePuja = '';
//                         jugador.precioVenta = null;
//                       }
//                       this.openSnackBar(
//                         'Se ha eliminado al jugador del mercado con éxito'
//                       );
//                     });
//                     //Mensaje de error
//                   } else
//                     this.openSnackBar(
//                       'No se ha podido poner al jugador en el mercado'
//                     );
//                 });

//               //Poner jugador a la venta
//             } else {
//               //Lo ponemos con la interfaz deseada y cambiamos los valores
//               this.jugadorParaVender = {
//                 ...res,
//                 mercado: true,
//                 valorTransferencia: data.precioVenta,
//               };
//               //Ponemos a la venta el jugador
//               this.jugadoresRealesService
//                 .modificarJugadorVenta(
//                   this.miEquipo.idLiga,
//                   this.jugadorParaVender
//                 )
//                 .subscribe((res2) => {
//                   //Mensaje de exito
//                   if (res2.status === 'exito') {
//                     this.jugadores.forEach((jugador) => {
//                       if (jugador.id === res2.jugador.idJugadorReal) {
//                         jugador.hayPuja = true;
//                         jugador.clasePuja = 'enVenta';
//                         jugador.precioVenta = res2.jugador.valorTransferencia;
//                       }
//                       this.openSnackBar('Jugador puesto en venta con éxito');
//                     });
//                     //Mensaje de error
//                   } else
//                     this.openSnackBar(
//                       'No se ha podido poner al jugador en el mercado'
//                     );
//                 });
//             }
//           });
//       }
//     });
//   }
//   //Muestra un mensaje
//   openSnackBar(mensaje: string) {
//     this._snackBar.open(mensaje, 'Cerrar', {
//       horizontalPosition: 'right',
//       verticalPosition: 'bottom',
//       duration: 5 * 1000,
//     });
//   }
// }
