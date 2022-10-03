import { Component, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorReal } from 'src/app/interfaces/jugador-real';
import { Usuario } from 'src/app/interfaces/usuario';
import { Jugadores } from 'src/app/mercado/componentes/tabla-fichajes/tabla-fichajes.component';

export interface Jugadores2 {
  id: number;
  jugador: string;
  estado: string;
  posicion: string;
  alias: string;
  puntos: number;
  capital: string;
  titular: boolean;
}

@Component({
  selector: 'app-principal-alineacion',
  templateUrl: './principal-alineacion.component.html',
  styleUrls: ['./principal-alineacion.component.scss'],
})
export class PrincipalAlineacionComponent implements OnInit {
  loading: boolean = true;
  sidenav: boolean = false;
  haySuplentes: Map<string, boolean> = new Map<string, boolean>(); //map: posicion,boolean para saber si en esa posicion hay suplentes o no
  posicionJugador: string = ''; //posicion bien escrita para mostrarla en pantalla
  posicion: string = ''; //abreviatura de la posicion del jugador
  misJugadores: JugadorReal[] = []; //array con todos los jugadores de mi equipo
  jugadores: Jugadores2[] = []; //array con los jugadores suplentes en la interfaz deseada
  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
  imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';
  jugadorSeleccionado!: JugadorReal; //jugador titular seleccionado para cambiarlo por un suplente
  jugadorSelec: Jugadores2[] = []; //jugador seleccionado con la interfaz deseada para mostrarla por pantalla (array para poder meterlo en el dataSource de la tabla)
  titulares: JugadorReal[] = [];
  equipoUserLogueado!: EquipoUser;
  usuarioLogueado!: Usuario;

  //TABLA
  displayedColumns: string[] = [
    'jugador',
    'estado',
    'posicion',
    'alias',
    'puntos',
  ];
  dataSource!: any;

  constructor(
    private jugadoresRealesService: JugadoresRealesService,
    private localStorage: LocalStorageService,
    private equipoUserService: EquiposUserService
  ) {}

  ngOnInit(): void {
    //Obtengo el usuario logueado
    this.usuarioLogueado = this.localStorage.getUsuarioLocalStorage();

    //Obtengo el equipo del usuario logueado
    this.equipoUserService
      .getEquipoUsuario(this.usuarioLogueado.id)
      .subscribe((res) => {
        this.equipoUserLogueado = res;

        if (this.equipoUserLogueado != undefined) this.loading = false;
      });
  }

  //Obtiene la posicion del jugador titular que se quiere cambiar
  getPosicion(posicion: any) {
    switch (posicion) {
      case 'AL':
      case 'AL2':
        this.posicionJugador = 'Ala';
        this.posicion = 'AL';
        break;
      case 'PT':
        this.posicionJugador = 'Portero';
        this.posicion = posicion;
        break;
      case 'PV':
        this.posicionJugador = 'Pivot';
        this.posicion = posicion;
        break;
      case 'CI':
        this.posicionJugador = 'Cierre';
        this.posicion = posicion;
        break;
      default:
        break;
    }
  }

  //Obtengo los jugadores titulares
  getTitulares(jugadoresTitulares: JugadorReal[]) {
    this.titulares = jugadoresTitulares;
  }

  //Meto en un array con la interfaz deseada, todos los jugadores de mi equipo
  getJugadores(jugadoresReales: JugadorReal[]) {
    this.misJugadores = jugadoresReales;
    this.jugadores = [];

    this.misJugadores.forEach((jugador) => {
      if (
        jugador.posicion === this.posicion &&
        !this.titulares.includes(jugador)
      ) {
        this.jugadores.push({
          id: jugador.id,
          jugador: jugador.foto,
          estado: jugador.estado,
          posicion: jugador.posicion,
          alias: jugador.alias,
          puntos: jugador.puntos,
          capital: new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
            currencySign: 'accounting',
          }).format(jugador.valorMercado),
          titular: jugador.titular,
        });

        this.haySuplentes.set(jugador.posicion, true);
      }
    });
  }

  //Obtengo el jugador suplente seleccionado y lo pongo con la interfaz deseada
  getJugador(jugador: JugadorReal) {
    this.jugadorSeleccionado = jugador;
    this.jugadorSelec = [];

    this.jugadorSelec.push({
      id: this.jugadorSeleccionado.id,
      jugador: this.jugadorSeleccionado.foto,
      estado: this.jugadorSeleccionado.estado,
      posicion: this.jugadorSeleccionado.posicion,
      alias: this.jugadorSeleccionado.alias,
      puntos: this.jugadorSeleccionado.puntos,
      capital: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
        currencySign: 'accounting',
      }).format(this.jugadorSeleccionado.valorMercado),
      titular: this.jugadorSeleccionado.titular,
    });
  }

  //Pone a un suplente en el equipo titular y al titular en los suplentes
  getJugadorSuplente(jugador: Jugadores) {
    let pos = 0;
    this.jugadorSeleccionado.titular = false;
    for (let i = 0; i < this.misJugadores.length; i++) {
      if (this.misJugadores[i].id === jugador.id) {
        this.misJugadores[i].titular = true;
        pos = i;
      }
    }

    this.jugadoresRealesService
      .updateJugadorReal(
        this.jugadorSeleccionado,
        this.equipoUserLogueado.idLiga
      )
      .subscribe((res) => {
        this.jugadoresRealesService
          .updateJugadorReal(
            this.misJugadores[pos],
            this.equipoUserLogueado.idLiga
          )
          .subscribe((res2) => {
            window.location.reload();
            //NO QUIERO QUE RECARGE LA PAGINA!!!!!!
          });
      });
  }

  //Comprueba si hay suplentes de cierta posicion
  haySuplente(posicion: string) {
    switch (posicion) {
      case 'Ala':
        if (this.haySuplentes.get('AL') === undefined) return false;
        else return this.haySuplentes.get('AL');
      case 'Pivot':
        if (this.haySuplentes.get('PV') === undefined) return false;
        else return this.haySuplentes.get('PV');
      case 'Portero':
        if (this.haySuplentes.get('PT') === undefined) return false;
        else return this.haySuplentes.get('PT');
      case 'Cierre':
        if (this.haySuplentes.get('CI') === undefined) return false;
        else return this.haySuplentes.get('CI');
      default:
        return null;
    }
  }
}
