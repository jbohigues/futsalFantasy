import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JugadorReal } from 'src/app/interfaces/jugador-real';

@Component({
  selector: 'app-posicion-vacia',
  templateUrl: './posicion-vacia.component.html',
  styleUrls: ['./posicion-vacia.component.scss'],
})
export class PosicionVaciaComponent implements OnInit {
  posicionString!: string;
  jugadoresTitulares: any = [];
  jugadoresReales: any = [];
  map: Map<string, JugadorReal> = new Map();
  hover: Map<string, string> = new Map();
  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';

  @Input() posicion!: string;
  @Output() misTitulares: EventEmitter<JugadorReal[]> = new EventEmitter<
    JugadorReal[]
  >();
  @Output() sidenav: EventEmitter<string> = new EventEmitter<string>();
  @Output() misJugadores: EventEmitter<JugadorReal[]> = new EventEmitter<
    JugadorReal[]
  >();
  @Output() jugadorSeleccionado: EventEmitter<JugadorReal> =
    new EventEmitter<JugadorReal>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.posicion);
    switch (this.posicion) {
      case 'PT':
        this.posicionString = 'Portero';
        break;
      case 'AL':
      case 'AL2':
        this.posicionString = 'Ala';
        break;
      case 'CI':
        this.posicionString = 'Cierre';
        break;
      case 'PV':
        this.posicionString = 'Pivot';
        break;
    }
  }

  //Abre el menu para realizar los cambios
  abrirSidenav(value: string) {
    this.sidenav.emit(value);
    this.misTitulares.emit(this.jugadoresTitulares);
    let jugadorReal = this.map.get(value);
    this.jugadorSeleccionado.emit(jugadorReal);
    this.misJugadores.emit(this.jugadoresReales);
  }

  //Pone efecto al hacer hover
  enter(pos: string) {
    this.hover.set(pos, 'hover');
  }

  //Quito efecto al hacer hover
  leave(pos: string) {
    this.hover.set(pos, '');
  }
}
