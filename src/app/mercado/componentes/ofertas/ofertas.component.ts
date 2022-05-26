import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { NoticiasService } from 'src/app/inicio/servicios/noticias.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { NoticiaOferta, Tema } from 'src/app/interfaces/noticia';
import { Estado, Traspaso } from 'src/app/interfaces/traspaso';
import { DialogComponent } from '../dialog/dialog.component';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})
export class OfertasComponent implements OnInit {
  //Variables
  jugadores: any[] = [];
  loading: boolean = true;
  valorOferta: string = '';
  foto: string = '';
  nombreEquipoUser: string = '';
  jugadorPujaFormateado!: Jugadores;
  jugadorPuja!: JugadorRealEnCadaLiga;
  traspaso!: Traspaso;
  equipoEmisor!: EquipoUser;
  equipoReceptor!: EquipoUser;
  oferta: number = 0;
  noticia!: NoticiaOferta;
  equipoLogueado!: EquipoUser;

  @Input() ofertas: any;

  //Imagenes
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
    'comprador',
    'puntos',
    'valor',
    'precioVenta',
  ];
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private jugadoresRealesService: JugadoresRealesService,
    private traspasosService: TraspasosService,
    private equiposUsersService: EquiposUserService,
    private noticiasService: NoticiasService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.ofertas.forEach((oferta: any) => {
      //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
      if (oferta.idEquipoUserEmisor === null) {
        this.foto = 'logoMercado';
        this.nombreEquipoUser = 'mercado';
      } else {
        this.foto =
          oferta.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserEmisor.foto;
        this.nombreEquipoUser =
          oferta.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserEmisor.nombre;
      }

      //Formateamos valor de la oferta
      this.valorOferta = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        currencySign: 'accounting',
      }).format(oferta.precio);

      this.jugadores.push({
        id: oferta.idJugador,
        idEquipoUserEmisor: oferta.idEquipoUserEmisor,
        jugador: oferta.jugadoresreales.foto,
        equipoReal: oferta.jugadoresreales.equiposreales.foto,
        posicion: oferta.jugadoresreales.posicion,
        alias: oferta.jugadoresreales.alias,
        estado: oferta.jugadoresreales.estado,
        propietario: this.foto,
        nombreEquipoUser: this.nombreEquipoUser.toUpperCase(),
        puntos: oferta.jugadoresreales.puntos,
        oferta: this.valorOferta,
        ofertaNumber: oferta.precio,
        valorMercado: oferta.jugadoresreales.valorMercado,
        valor: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(oferta.jugadoresreales.valorMercado),
        clasePuja: 'oferta',
      });
    });

    this.dataSource = new MatTableDataSource<Jugadores>(this.jugadores);
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  abrirModal(element: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        precioPuja: element.oferta,
        jugadorPuja: element,
        vista: 'oferta',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        //ACEPTAR OFERTA
        if (data.resolucionOferta === 'aceptada') {
          //Obtengo la oferta realizada
          this.oferta = data.jugadorPuja.ofertaNumber;
          //Obtengo la informacion del jugador real que se quiere intercambiar
          this.jugadoresRealesService
            .getInfoJugador(
              data.jugadorPuja.id,
              this.ofertas[0]
                .equiposusuarios_equiposusuariosTotraspasos_idEquipoUserEmisor
                .idLiga
            )
            .subscribe((res) => {
              //Obtengo el equipo que recibirá el jugador
              this.equipoReceptor = res.equiposusuarios;
              //y el jugador que se quiere intercambiar
              this.jugadorPuja = res;
              //Paso el jugador real al usuario que ha realizado la oferta
              this.jugadorPuja.idEquipoUser =
                data.jugadorPuja.idEquipoUserEmisor;
              //Quitamos el jugador real del mercado y ponemos valores por defecto: titular=false; valorTransferencia=null
              this.jugadoresRealesService
                .aceptarOferta(this.jugadorPuja)
                .subscribe((res2) => {
                  if (res2.status === 'exito') {
                    //Obtenemos el traspaso, si existe
                    this.traspasosService
                      .comprobarExistePuja(
                        this.jugadorPuja.idJugadorReal,
                        this.jugadorPuja.idEquipoUser
                      )
                      .subscribe((res3) => {
                        //Pasar el estado del traspaso a Aceptado
                        if (res3.status === 'hayJugador') {
                          this.traspaso = res3.traspaso;
                          this.traspaso.estado = Estado.Aceptada;
                          this.traspasosService
                            .responderOferta(this.traspaso)
                            .subscribe((res4) => {
                              if (res4.status === 'update') {
                                //Obtengo el equipoUser del usuario que hace la oferta
                                this.equiposUsersService
                                  .getEquipoUsuarioPorIDEquipoUser(
                                    res4.traspaso.idEquipoUserEmisor
                                  )
                                  .subscribe((res5) => {
                                    this.equipoEmisor = res5;
                                    //Modifico capital equipo emisor
                                    if (this.equipoEmisor != null) {
                                      this.equipoEmisor.dinero =
                                        this.equipoEmisor.dinero - this.oferta;
                                      this.equiposUsersService
                                        .actualizarSaldo(this.equipoEmisor)
                                        .subscribe((res6) => {
                                          //Modifico capital equipo receptor
                                          if (res6.status === 'actualizado') {
                                            this.equipoReceptor.dinero =
                                              this.equipoReceptor.dinero +
                                              this.oferta;
                                            this.equiposUsersService
                                              .actualizarSaldo(
                                                this.equipoReceptor
                                              )
                                              .subscribe((res7) => {
                                                //Creo la noticia respectiva
                                                console.log(res7);
                                                if (
                                                  res7.status === 'actualizado'
                                                ) {
                                                  this.noticia = {
                                                    idLiga:
                                                      this.equipoEmisor.idLiga,
                                                    tema: Tema.Traspaso,
                                                    texto:
                                                      this.jugadorPuja
                                                        .jugadoresreales.alias +
                                                      ' ha fichado por el ' +
                                                      this.equipoReceptor.nombre.toUpperCase(),
                                                  };

                                                  this.noticiasService
                                                    .crearNoticia(this.noticia)
                                                    .subscribe((res8) => {
                                                      if (
                                                        res8.status ===
                                                        'nuevaNoticia'
                                                      ) {
                                                        this.openSnackBar(
                                                          'Oferta aceptada por ' +
                                                            this.jugadorPuja.jugadoresreales.alias.toUpperCase()
                                                        );
                                                        window.location.reload();
                                                      }
                                                    });
                                                }
                                              });
                                          }
                                        });
                                    }
                                  });
                              }
                            });
                        }
                      });
                  }
                });
            });

          //RECHAZAR OFERTA
        } else if (data.resolucionOferta === 'rechazada') {
          //Pasar el estado del traspaso a Rechazado
          this.traspasosService
            .comprobarExistePuja(
              data.jugadorPuja.id,
              data.jugadorPuja.idEquipoUserEmisor
            )
            .subscribe((res) => {
              console.log(res);
              if (res.status === 'hayJugador') {
                this.traspaso = res.traspaso;
                this.traspaso.estado = Estado.Rechazada;
                console.log(this.traspaso);
                this.traspasosService
                  .responderOferta(this.traspaso)
                  .subscribe((res2) => {
                    if (res2.status === 'update') {
                      this.openSnackBar(
                        'Has rechazado la oferta por ' + data.jugadorPuja.alias
                      );
                      window.location.reload();
                    }
                  });
              }
            });
        }
      }
    });
  }

  crearNoticia() {
    this.noticia = {
      idLiga: 1,
      tema: Tema.Traspaso,
      texto: 'Paco ha fichado por el culo',
    };
    console.log(this.noticia);

    this.noticiasService.crearNoticia(this.noticia).subscribe((res8) => {
      if (res8.status === 'nuevaNoticia') alert('Noticia creada');
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
