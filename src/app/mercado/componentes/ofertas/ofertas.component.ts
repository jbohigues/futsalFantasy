import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
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
    private traspasosService: TraspasosService
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
      console.log(data);
      if (data != undefined) {
        if (data.resolucionOferta === 'aceptada') {
          this.jugadoresRealesService
            .getInfoJugador(data.jugadorPuja.id)
            .subscribe((res) => {
              this.jugadorPuja = res;
              this.jugadorPuja.idEquipoUser =
                data.jugadorPuja.idEquipoUserEmisor;
              this.jugadoresRealesService
                .aceptarOferta(this.jugadorPuja)
                .subscribe((res2) => {
                  console.log(res2);
                  if (res2.status === 'exito') {
                    //Pasar el estado del traspaso a Aceptado
                    this.traspasosService
                      .comprobarExistePuja(
                        this.jugadorPuja.idJugadorReal,
                        this.jugadorPuja.idEquipoUser
                      )
                      .subscribe((res3) => {
                        if (res3.status === 'hayJugador') {
                          this.traspaso = res3.traspaso;
                          this.traspaso.estado = Estado.Aceptada;
                          this.traspasosService
                            .aceptarOferta(this.traspaso)
                            .subscribe((res4) => {
                              if (res4.status === 'update') {
                                //Modificar capital de cada usuario
                                //Comprobar que el otro usuario recibe el jugador
                                //Alineacion peta: falta un jugador titular (en teoria seran suplentes) pero puede pasar
                                //Poner alternativa si no llega a 5 titulares (poner imagen en esa posicion)
                                alert(
                                  'Has vendido a ' +
                                    data.jugadorPuja.alias +
                                    ' por ' +
                                    data.precioPuja
                                );
                                window.location.reload();
                              }
                            });
                        }
                      });
                  }
                });
            });

          //Pasar el jugador de un usuario a otro
        } else if (data.resolucionOferta === 'rechazada') {
          //Pasar el estado del traspaso a Rechazado
          alert('Has rechazado la oferta por ' + data.jugadorPuja.alias);
        }
      }
    });
  }
}
