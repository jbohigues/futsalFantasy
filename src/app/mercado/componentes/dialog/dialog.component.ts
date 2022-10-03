import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Jugadores } from '../tabla-fichajes/tabla-fichajes.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  //Variables
  jugador: any;
  jugadorPuja: any[] = [];
  foto: string = '';
  nombreEquipoUser: string = '';
  valorMercado: string = '';
  pujaMaxima: number = 0;
  pujaMaximaFormateada: string = '';
  hayError: boolean = false;
  error: string = '';
  hayPuja!: boolean;
  capitalEquipo: number = 0;
  saldoFuturo: string = '';

  //Variables para la puja
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
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      precioPuja: number;
      hayPuja: boolean;
      pujaMaxima: number;
      jugadorPuja: any;
      tipoPuja: string;
      vista: string;
      propietario: EquipoUser;
      resolucionOferta: string;
    }
  ) {}

  ngOnInit(): void {
    //Si viene de la vista de ofertas
    if (this.data.vista === 'oferta') {
      this.jugador = this.data.jugadorPuja;
      this.valorMercado = this.jugador.valor;
      this.pujaNumber = this.jugador.ofertaNumber;

      /**
       * FALTA SACAR VALOR DE MERCADO
       */

      this.jugadorPuja.push({
        id: this.jugador.id,
        jugador: this.jugador.jugador,
        equipoReal: this.jugador.equipoReal,
        posicion: this.jugador.posicion,
        alias: this.jugador.alias,
        estado: this.jugador.estado,
        propietario: this.jugador.propietario,
        nombreEquipoUser: this.jugador.nombreEquipoUser.toUpperCase(),
        puntos: this.jugador.puntos,
        precioVenta: this.jugador.valor,
        valor: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(this.jugador.valor),
        clasePuja: 'oferta',
      });

      this.dataSource = new MatTableDataSource<Jugadores>(this.jugadorPuja);
      //Si viene de la vista de mercado
    } else {
      //Obtengo el capital del equipo
      this.capitalEquipo = this.data.propietario.dinero;
      //Obtengo un boleano diciendome si ya he realizado una puja sobre ese jugador
      this.hayPuja = this.data.hayPuja;
      //Obtengo la puja maxima que puede realizar el usuario
      if (this.data.pujaMaxima < 0) this.pujaMaxima = 0;
      else this.pujaMaxima = this.data.pujaMaxima;
      //Obtengo el jugador
      this.jugador = this.data.jugadorPuja;

      this.jugadorPuja = [];
      //Obtengo el precio de la puja en caso de que ya haya realizado una a ese jugador
      if (this.hayPuja) this.pujaNumber = this.data.precioPuja;
      //Si no hay puja, obtengo su valor de transferencia o de mercado
      else if (this.jugador.valorTransferencia != null)
        this.pujaNumber = this.jugador.valorTransferencia;
      else this.pujaNumber = this.jugador.jugadoresreales.valorMercado;

      //Formateo sus valores de 'precio de venta', 'precio de mercado' y 'la puja maxima'
      if (this.jugador.valorTransferencia != null)
        this.precioVenta = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(this.jugador.valorTransferencia);
      else
        this.precioVenta = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(this.jugador.jugadoresreales.valorMercado);

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

      if (this.data.vista === 'misPujas') {
        if (this.data.jugadorPuja.idEquipoUserReceptor === null) {
          //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
          this.foto = 'logoMercado';
          this.nombreEquipoUser = 'mercado';
        } else {
          this.foto =
            this.data.jugadorPuja.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserReceptor.foto;
          this.nombreEquipoUser =
            this.data.jugadorPuja.equiposusuarios_equiposusuariosTotraspasos_idEquipoUserReceptor.nombre;
        }
      } else {
        if (this.jugador.idEquipoUser === null) {
          //Si no tiene equipo, le metemos foto y nombre de equipo de Mercado
          this.foto = 'logoMercado';
          this.nombreEquipoUser = 'mercado';
        } else {
          this.foto = this.jugador.equiposusuarios.foto;
          this.nombreEquipoUser = this.jugador.equiposusuarios.nombre;
        }
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
        clasePuja: '',
        hayPuja: false,
        precioMiPuja: 0,
        idTraspaso: 0,
      });

      this.dataSource = new MatTableDataSource<Jugadores>(this.jugadorPuja);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Filtra las teclas posibles en el input de la puja
  permitirCiertasTeclas(evento: any) {
    //sacamos el codigo ASCII de la tecla pulsada
    var code = evento.which ? evento.which : evento.keyCode;

    if (code == 8 || code == 46) {
      if (evento.target.value === '0') return false;
      //si pulsa borrar o suprimir
      else return true;
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

  //Disminuye el precio de la puja
  restar() {
    this.pujaNumber--;
    this.saldoFuturo = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.capitalEquipo - this.pujaNumber);

    this.openSnackBar('Saldo futuro: ' + this.saldoFuturo);
    this.comprobarError(this.pujaNumber);
  }

  //Aumenta el precio de la puja
  sumar() {
    this.pujaNumber++;
    this.saldoFuturo = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.capitalEquipo - this.pujaNumber);

    this.openSnackBar('Saldo futuro: ' + this.saldoFuturo);
    this.comprobarError(this.pujaNumber);
  }

  formatearNum(event: any) {
    let num = event.target.value;
    num = num.replace(/[.]/g, '');
    this.comprobarError(num);
    if (num === '') this.pujaNumber = 0;
    else this.pujaNumber = parseInt(num);

    this.saldoFuturo = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.capitalEquipo - this.pujaNumber);

    this.openSnackBar('Saldo futuro: ' + this.saldoFuturo);
  }

  /**
   *
   * FUNCION EN PRUEBA: intentar quitar un numero en vez del simbolo € al pulsar el
   * botón de eliminar
   *
   */
  //Filtra las teclas posibles en el input de la puja
  // permitirCiertasTeclas(evento: any) {
  //   //sacamos el codigo ASCII de la tecla pulsada
  //   var code = evento.which ? evento.which : evento.keyCode;

  //   if (code == 8 || code == 46) {
  //     if (evento.target.value === '0') return false;
  //     //si pulsa borrar o suprimir
  //     else return true;
  //   } else if (code >= 37 && code <= 39) {
  //     //si pulsa botón de izq o der
  //     return true;
  //   } else if (code >= 48 && code <= 57) {
  //     //si pulsa un numero
  //     return true;
  //   } else if (code >= 96 && code <= 105) {
  //     //si pulsa un numero del panel derecho
  //     return true;
  //   } else {
  //     //si pulsa otra tecla diferente
  //     return false;
  //   }
  // }

  //Muestra el numero de la puja con el formato deseado, aunque modifique dicho numero
  // formatearNum(event: any) {
  //   let num = event.target.value;
  //   num = num.replace(/[.]/g, '');
  //   num = num.replace('€' && ' €', '');
  //   this.comprobarError(num);
  //   // if (num === '') this.pujaNumber = 0;
  //   // else this.pujaNumber = parseInt(num);
  //   console.log(num, this.pujaNumber);
  //   this.pujaNumber = this.pujaNumber.toString().replace(' €', '');

  //   if (parseInt(num) == this.pujaNumber) {
  //     console.log('borro euro', num);
  //     num = num.replace(' ', '');
  //     num = num.substring(0, num.length - 1);
  //     // console.log(num);

  //     this.comprobarError(num);
  //     this.pujaNumber = parseInt(num);
  //   } else {
  //     console.log('hola');
  //     num = num.replace(' €', '');
  //     this.comprobarError(num);
  //     this.pujaNumber = num;
  //   }

  //   this.saldoFuturo = new Intl.NumberFormat('de-DE', {
  //     style: 'currency',
  //     currency: 'EUR',
  //     maximumFractionDigits: 0,
  //     currencySign: 'accounting',
  //   }).format(this.capitalEquipo - this.pujaNumber);

  //   this.openSnackBar('Saldo futuro: ' + this.saldoFuturo);
  //   this.pujaNumber = this.pujaNumber.toString().concat(' €');
  //   console.log('puja', this.pujaNumber);
  // }

  //Comprobamos que la puja está entre el precio mínimo y máximo
  comprobarError(valor: number) {
    if (valor > this.pujaMaxima) {
      this.hayError = true;
      this.error =
        'El precio de puja máximo es de ' + this.pujaMaximaFormateada + ' *';
    } else if (valor < this.jugador.jugadoresreales.valorMercado) {
      this.hayError = true;
      this.error = 'El precio de puja mínimo es de ' + this.valorMercado + ' *';
    } else {
      this.hayError = false;
    }
  }

  //Obtenemos un string que nos permitirá retirar una puja realizada a un jugador del mercado
  retirarPuja() {
    this.data.tipoPuja = 'retirar';
  }

  //Obtenemos la puja final
  obtenerPuja() {
    this.data.precioPuja = this.pujaNumber;
  }

  //Muestra un mensaje
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5 * 1000,
    });
  }

  rechazarOferta() {
    this.data.resolucionOferta = 'rechazada';
  }

  aceptarOferta() {
    this.data.resolucionOferta = 'aceptada';
  }
}
