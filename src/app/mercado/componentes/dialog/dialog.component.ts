import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  //Variables
  jugador!: JugadorRealEnCadaLiga;
  jugadorPuja: Jugadores[] = [];
  foto: string = '';
  nombreEquipoUser: string = '';
  valorMercado: string = '';

  //Estos dos valores son los que mostraré debajo de la tabla
  valorCompra: string = '';
  valorJugador: string = '';

  //Variables para la puja
  puja: string = '';
  pujaNumber: number = 0;
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
    'propietario',
    'puntos',
  ];
  dataSource!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JugadorRealEnCadaLiga
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    //Obtengo el jugador
    this.jugador = this.data;
    this.jugadorPuja = [];
    if (this.jugador.valorTransferencia != null)
      this.pujaNumber = this.jugador.valorTransferencia;
    else this.pujaNumber = this.jugador.jugadoresreales.valorMercado;

    //Formateo sus valores de venta y de mercado
    this.puja = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.pujaNumber);

    this.valorJugador = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.jugador.jugadoresreales.valorMercado);

    //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
    if (this.jugador.idEquipoUser === null) {
      this.foto = 'logoMercado';
      this.nombreEquipoUser = 'mercado';
    } else {
      this.foto = this.jugador.equiposusuarios.foto;
      this.nombreEquipoUser = this.jugador.equiposusuarios.nombre;
    }

    //Si no tiene valor de transferencia, significa que es de Mercado, así que su precio de venta sera el mismo que el valor del jugador
    if (this.jugador.valorTransferencia === null) {
      this.valorMercado = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        currencySign: 'accounting',
      }).format(this.jugador.jugadoresreales.valorMercado);
    } else {
      this.valorMercado = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        currencySign: 'accounting',
      }).format(this.jugador.valorTransferencia);
    }

    this.jugadorPuja.push({
      id: this.jugador.idJugadorReal,
      jugador: this.jugador.jugadoresreales.foto,
      equipoReal: this.jugador.jugadoresreales.equiposreales.foto,
      posicion: this.jugador.jugadoresreales.posicion,
      alias: this.jugador.jugadoresreales.alias,
      estado: this.jugador.jugadoresreales.estado,
      propietario: this.foto,
      nombreEquipoUser: this.nombreEquipoUser.toUpperCase(),
      puntos: this.jugador.jugadoresreales.puntos,
      titular: this.jugador.titular,
      precioVenta: this.valorMercado,
      valor: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        currencySign: 'accounting',
      }).format(this.jugador.jugadoresreales.valorMercado),
    });

    this.dataSource = new MatTableDataSource<Jugadores>(this.jugadorPuja);
    console.log(this.dataSource);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
