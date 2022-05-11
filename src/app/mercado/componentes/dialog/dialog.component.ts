import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  pujaMaxima: number = 0;
  pujaMaximaFormateada: string = '';
  hayError: boolean = false;
  error: string = '';

  //Variables para la puja
  puja: string = ''; //puja que realizará el usuario por el jugador
  precioVenta: string = ''; //precio al que lo vende su propietario
  pujaNumber: number = 0; //precio en tipo number

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
    @Inject(MAT_DIALOG_DATA)
    public data: { pujaMaxima: number; jugadorPuja: JugadorRealEnCadaLiga }
  ) {}

  ngOnInit(): void {
    //Obtengo la puja maxima que puede realizar el usuario
    this.pujaMaxima = this.data.pujaMaxima;
    //Obtengo el jugador
    this.jugador = this.data.jugadorPuja;

    this.jugadorPuja = [];
    if (this.jugador.valorTransferencia != null)
      this.pujaNumber = this.jugador.valorTransferencia;
    else this.pujaNumber = this.jugador.jugadoresreales.valorMercado;

    //Formateo sus valores de 'precio de venta', 'precio de mercado' y 'la puja maxima'
    this.precioVenta = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.pujaNumber);

    this.valorMercado = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.jugador.jugadoresreales.valorMercado);

    this.pujaMaximaFormateada = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.pujaMaxima);

    //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
    if (this.jugador.idEquipoUser === null) {
      this.foto = 'logoMercado';
      this.nombreEquipoUser = 'mercado';
    } else {
      this.foto = this.jugador.equiposusuarios.foto;
      this.nombreEquipoUser = this.jugador.equiposusuarios.nombre;
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Filtra las teclas posibles en el input de la puja
  permitirCiertasTeclas(evento: any) {
    //sacamos el codigo ASCII de la tecla pulsada
    var code = evento.which ? evento.which : evento.keyCode;
    console.log(code);

    if (code == 8 || code == 46) {
      //si pulsa borrar o suprimir
      return true;
    } else if (code >= 37 && code <= 39) {
      //si pulsa botón de izq o der
      return true;
    } else if (code >= 48 && code <= 57) {
      //si pulsa un numero
      return true;
    } else if (code >= 96 && code <= 105) {
      //si pulsa un numero del panel derecho
      return true;
    } else {
      //si pulsa otra tecla diferente
      return false;
    }
  }

  restar() {
    this.pujaNumber--;
  }

  sumar() {
    this.pujaNumber++;
  }

  //Muestra el numero de la puja con el formato deseado, aunque modifique dicho numero
  formatearNum(event: any) {
    let num = event.target.value;
    num = num.replace(/[.]/g, '');

    if (num > this.pujaMaxima) {
      this.hayError = true;
      this.error = 'La puja máxima es de ' + this.pujaMaximaFormateada + ' *';
    } else if (num < this.jugador.jugadoresreales.valorMercado) {
      this.hayError = true;
      this.error = 'La puja mínima es de ' + this.valorMercado + ' *';
    } else {
      this.hayError = false;
    }
    this.pujaNumber = num;
  }
}
