import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';

export interface JugadoresAlineacion {
  id: number;
  jugador: string;
  equipoReal: string;
  posicion: string;
  alias: string;
  estado: string;
  propietario: string;
  nombreEquipoUser: string;
  puntos: number;
  titular: boolean;
}

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss'],
})
export class DialogVentaComponent implements OnInit {
  //Variables
  jugador!: any;
  jugadorVenta: JugadoresAlineacion[] = [];
  nombreEquipoUser: string = '';
  valorMercado: string = '';
  foto: string = '';
  precioVenta: number = 0;
  hayError: boolean = false;
  error: string = '';
  miEquipo!: EquipoUser;
  precioMaximo: number = 0;
  precioMaximoFormateado: string = '';

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
    public dialogRef: MatDialogRef<DialogVentaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      precioVenta: number;
      hayPuja: boolean;
      jugadorVenta: JugadorRealEnCadaLiga;
      tipoPuja: string;
      vista: string;
      propietario: EquipoUser;
    }
  ) {}

  ngOnInit(): void {
    //Obtengo el jugador
    this.jugador = this.data.jugadorVenta;
    if (this.data.hayPuja) this.precioVenta = this.data.precioVenta;
    else this.precioVenta = this.jugador.valorMercado;
    this.miEquipo = this.data.propietario;
    this.precioMaximo = this.jugador.valorMercado * 1.5;
    this.precioMaximoFormateado = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.precioMaximo);
    this.jugadorVenta = [];

    //Formateo sus valores de 'precio de venta', 'precio de mercado' y 'la puja maxima'
    this.valorMercado = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.jugador.valorMercado);

    this.jugadorVenta.push({
      id: this.jugador.id,
      jugador: this.jugador.foto,
      equipoReal: this.jugador.equiposreales.foto,
      posicion: this.jugador.posicion,
      alias: this.jugador.alias,
      estado: this.jugador.estado,
      propietario: this.miEquipo.foto,
      nombreEquipoUser: this.miEquipo.nombre.toUpperCase(),
      puntos: this.jugador.puntos,
      titular: this.jugador.titular,
    });

    this.dataSource = new MatTableDataSource<JugadoresAlineacion>(
      this.jugadorVenta
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Filtra las teclas posibles en el input de la puja
  permitirCiertasTeclas(evento: any) {
    //sacamos el codigo ASCII de la tecla pulsada
    var code = evento.which ? evento.which : evento.keyCode;

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
    this.precioVenta--;
    if (this.precioVenta > this.precioMaximo) {
      this.hayError = true;
      this.error =
        'El precio de venta máximo es de ' + this.precioMaximoFormateado + ' *';
    } else if (this.precioVenta < this.jugador.valorMercado) {
      this.hayError = true;
      this.error =
        'El precio de venta mínimo es de ' + this.valorMercado + ' *';
    } else {
      this.hayError = false;
    }
  }

  sumar() {
    this.precioVenta++;
    if (this.precioVenta > this.precioMaximo) {
      this.hayError = true;
      this.error =
        'El precio de venta máximo es de ' + this.precioMaximoFormateado + ' *';
    } else if (this.precioVenta < this.jugador.valorMercado) {
      this.hayError = true;
      this.error =
        'El precio de venta mínimo es de ' + this.valorMercado + ' *';
    } else {
      this.hayError = false;
    }
  }

  //Muestra el numero de la venta con el formato deseado, aunque modifique dicho numero
  formatearNum(event: any) {
    let num = event.target.value;
    num = num.replace(/[.]/g, '');

    if (num > this.precioMaximo) {
      this.hayError = true;
      this.error =
        'El precio de venta máximo es de ' + this.precioMaximoFormateado + ' *';
    } else if (num < this.jugador.valorMercado) {
      this.hayError = true;
      this.error =
        'El precio de venta mínimo es de ' + this.valorMercado + ' *';
    } else {
      this.hayError = false;
    }
    this.precioVenta = num;
  }

  venderJugador() {
    this.data.precioVenta = this.precioVenta;
  }

  retirarVenta() {
    this.data.tipoPuja = 'retirar';
  }
}
