import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JugadorReal } from 'src/app/interfaces/jugador-real';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class JugadoresRealesService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'jugadoresReales';
  private REST_API_SERVER2 =
    environment.REST_API_SERVER + 'jugadoresRealesEnCadaLiga';

  constructor(private http: HttpClient) {}

  //Obtiene los jugadores reales de un equipo
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
      this.REST_API_SERVER2 +
        '/update/idL=' +
        idLiga +
        '/idJ=' +
        jugadorReal.id,
      jugadorReal
    );
  }

  //Obtiene los jugadores puestos en venta de cierta liga
  getJugadoresMercado(idLiga: number): Observable<JugadorRealEnCadaLiga[]> {
    return this.http.get<JugadorRealEnCadaLiga[]>(
      this.REST_API_SERVER2 + '/l=' + idLiga
    );
  }
}
