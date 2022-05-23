import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JugadorReal } from 'src/app/interfaces/jugador-real';
import {
  JugadorMercado,
  JugadorRealEnCadaLiga,
  JugadorRealEnCadaLigaCreate,
} from 'src/app/interfaces/jugador-real-en-cada-liga';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class JugadoresRealesService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'jugadoresReales';
  private REST_API_SERVER2 =
    environment.REST_API_SERVER + 'jugadoresRealesEnCadaLiga';

  constructor(private http: HttpClient) {}

  //Obtiene todos los jugadoresReales almacenados en la bd
  obtenerJugadoresReales(): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER2 + '/');
  }

  //Obtiene los jugadores reales de cierto equipoUser en cierta liga
  getJugadoresRealesDeEquipoUsuario(
    idLiga: number,
    idEquipoUser: number
  ): Observable<JugadorReal[]> {
    return this.http.get<JugadorReal[]>(
      this.REST_API_SERVER2 + '/l=' + idLiga + '/e=' + idEquipoUser
    );
  }

  //Cambia la titularidad de un jugador real
  updateJugadorReal(jugadorReal: JugadorReal, idLiga: number): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER2 + '/update/l=' + idLiga + '/j=' + jugadorReal.id,
      jugadorReal
    );
  }

  //Obtiene los jugadores puestos en venta de cierta liga
  getJugadoresMercado(idLiga: number): Observable<JugadorRealEnCadaLiga[]> {
    return this.http.get<JugadorRealEnCadaLiga[]>(
      this.REST_API_SERVER2 + '/l=' + idLiga
    );
  }

  //Obtiene la informacion de cierto jugador
  getInfoJugador(idJugadorReal: number, idLiga: number): Observable<any> {
    return this.http.get<any>(
      this.REST_API_SERVER2 + '/l=' + idLiga + '/j=' + idJugadorReal
    );
  }

  //Modificar jugador: ponerlo (en venta) o quitarlo del mercado de fichajes
  modificarJugadorVenta(
    idLiga: number,
    jugadorReal: JugadorRealEnCadaLiga
  ): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER2 +
        '/vender/idL=' +
        idLiga +
        '/idJ=' +
        jugadorReal.idJugadorReal,
      jugadorReal
    );
  }

  //Aceptar oferta
  aceptarOferta(jugador: JugadorRealEnCadaLiga): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER2 +
        '/aceptarOferta/l=' +
        jugador.idLiga +
        '/j=' +
        jugador.idJugadorReal,
      jugador
    );
  }

  //Crear equipoUser
  crearEquipoUser(jugador: JugadorRealEnCadaLigaCreate): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER2 + '/crearEquipo', jugador);
  }

  //Poner jugador libre en el mercado
  ponerJugadorLibreEnMercado(jugador: JugadorMercado): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER2 + '/mercado', jugador);
  }
}
