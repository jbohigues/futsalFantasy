import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorReal } from 'src/app/interfaces/jugador-real';

@Component({
  selector: 'app-cuadro-alineacion',
  templateUrl: './cuadro-alineacion.component.html',
  styleUrls: ['./cuadro-alineacion.component.scss'],
})
export class CuadroAlineacionComponent implements OnInit {
  //VARIABLES
  loading: boolean = true;
  hayAla: boolean = false;
  hayLesionados: boolean = false;
  hayExpulsados: boolean = false;
  jugadoresTitulares: any = [];
  jugadoresReales: any = [];
  map: Map<string, JugadorReal> = new Map();
  hover: Map<string, string> = new Map();
  @Input() equipoUserLogueado!: EquipoUser;
  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
  imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';

  @Output() misTitulares: EventEmitter<JugadorReal[]> = new EventEmitter<
    JugadorReal[]
  >();
  @Output() sidenav: EventEmitter<string> = new EventEmitter<string>();
  @Output() misJugadores: EventEmitter<JugadorReal[]> = new EventEmitter<
    JugadorReal[]
  >();
  @Output() jugadorSeleccionado: EventEmitter<JugadorReal> =
    new EventEmitter<JugadorReal>();

  // mapColores: Map<string, number[]> = new Map([
  //   ["Rojo", [],
  // ]
  // ]);

  constructor() {}

  ngOnInit(): void {
    //Me guardo en un array los titulares del equipo del usuario logueado
    this.equipoUserLogueado.jugadoresrealesencadaliga.forEach((element) => {
      this.jugadoresReales.push(element.jugadoresreales);

      if (element.titular)
        this.jugadoresTitulares.push(element.jugadoresreales);
    });

    //Me guardo en un map los jugadores titulares con la relacion posicion:jugador
    this.jugadoresTitulares.forEach((jugador: JugadorReal) => {
      if (jugador != undefined) {
        if (this.map.get('AL') && jugador.posicion === 'AL')
          this.map.set(jugador.posicion + '2', jugador);
        else this.map.set(jugador.posicion, jugador);

        //Informo de si hay jugadores expulsados o lesionados
        if (jugador.estado === 'EX') this.hayExpulsados = true;
        if (jugador.estado === 'L') this.hayLesionados = true;

        //Quito el loading cuando haya 5 titulares
        if (this.map.size === 5) this.loading = false;
      }
    });
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
