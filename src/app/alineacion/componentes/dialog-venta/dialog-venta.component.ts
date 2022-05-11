import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  jugador!: JugadorRealEnCadaLiga;
  jugadorVenta: JugadoresAlineacion[] = [];
  nombreEquipoUser: string = '';
  valorMercado: string = '';
  precioVenta: number = 0;

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
    public data: { jugadorVenta: JugadorRealEnCadaLiga }
  ) {}

  ngOnInit(): void {
    //Obtengo el jugador
    this.jugador = this.data.jugadorVenta;
    this.precioVenta = this.jugador.jugadoresreales.valorMercado;
    this.jugadorVenta = [];

    //Formateo sus valores de 'precio de venta', 'precio de mercado' y 'la puja maxima'
    this.valorMercado = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.jugador.jugadoresreales.valorMercado);

    this.jugadorVenta.push({
      id: this.jugador.idJugadorReal,
      jugador: this.jugador.jugadoresreales.foto,
      equipoReal: this.jugador.jugadoresreales.equiposreales.foto,
      posicion: this.jugador.jugadoresreales.posicion,
      alias: this.jugador.jugadoresreales.alias,
      estado: this.jugador.jugadoresreales.estado,
      propietario: this.jugador.equiposusuarios.foto,
      nombreEquipoUser: this.nombreEquipoUser.toUpperCase(),
      puntos: this.jugador.jugadoresreales.puntos,
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
  }

  sumar() {
    this.precioVenta++;
  }

  //Muestra el numero de la venta con el formato deseado, aunque modifique dicho numero
  formatearNum(event: any) {
    let num = event.target.value;
    num = num.replace(/[.]/g, '');
    this.precioVenta = num;
  }
}
