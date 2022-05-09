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
  // step: number = 1;
  // pujaForm!: FormGroup;
  // loading: boolean = true;

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
    // private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { pujaMaxima: number; jugadorPuja: JugadorRealEnCadaLiga }
  ) {
    // this.pujaForm = formBuilder.group(
    //   {
    //     puja: ['', Validators.required],
    //     pujaMax: [''],
    //   },
    //   { validators: [this.comprobarPuja] }
    // );
  }

  ngOnInit(): void {
    //Obtengo la puja maxima que puede realizar el usuario
    this.pujaMaxima = this.data.pujaMaxima;
    //Obtengo el jugador
    this.jugador = this.data.jugadorPuja;

    this.jugadorPuja = [];
    if (this.jugador.valorTransferencia != null)
      this.pujaNumber = this.jugador.valorTransferencia;
    else this.pujaNumber = this.jugador.jugadoresreales.valorMercado;

    //Formateo sus valores de venta y de mercado
    this.puja = new Intl.NumberFormat('de-DE', {
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(this.pujaNumber);

    this.precioVenta = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.pujaNumber);

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
    // if (this.jugadorPuja.length) this.loading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // comprobarPuja(formGroup: FormGroup) {
  //   const { puja, pujaMax } = formGroup.controls;
  //   console.log(pujaMax);

  //   if (puja.value > pujaMax.value) return puja.setErrors({ pujaMaxima: true });
  //   // if (puja.value < this.jugador.jugadoresreales.valorMercado)
  //   // return puja.setErrors({ pujaMinima: true });
  // }

  // pujaMaximaFunction() {
  //   return this.pujaMaxima;
  // }

  soloNumeros(evento: any) {
    //sacamos el codigo ASCII de la tecla pulsada
    var code = evento.which ? evento.which : evento.keyCode;

    if (code == 8) {
      //si pulsa borrar
      return true;
    } else if (code >= 48 && code <= 57) {
      //si pulsa un numero
      return true;
    } else {
      //si pulsa otra tecla diferente
      return false;
    }
  }

  mostrarPuja(event: any) {
    console.log(event.target.value);
    return event.target.value;
  }

  //COMO PONER LA PUTA PUJA!!!!!!!!!!!!!!!!!!!!!!
  sumar() {
    // console.log('hola');

    let suma = 1;
    let total = 0;
    // while (document.getElementById('suma')?.onmousedown) {
    //   console.log('hola');

    //   this.pujaNumber += suma;
    //   suma++;
    // }

    var btnClick = document.getElementById('suma')!;
    // var startTime, endTime;

    /*Cuando se haga clic*/
    btnClick.onmousedown = function () {
      // startTime = new Date();
      console.log('Estoy presionado, haz lo que necesites...');
      suma++;
    };

    /*Cuando se deje de hacer clic*/
    btnClick.onmouseup = function () {
      total = suma;
    };
    this.pujaNumber = total;
  }

  // aumentarRango() {
  //   this.step++;
  //   document
  //     .getElementById('contador')
  //     ?.setAttribute('step', this.step.toString());
  // }
}
