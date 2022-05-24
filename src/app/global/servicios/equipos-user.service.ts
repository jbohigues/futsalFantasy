import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoUser, EquipoUserCreate } from 'src/app/interfaces/equipo-user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EquiposUserService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'equiposUser';

  constructor(private http: HttpClient) {}

  //Obtiene el equipo de un usuario y sus jugadores ordenados por posicion
  getEquipoUsuario(id: number): Observable<EquipoUser> {
    return this.http.get<EquipoUser>(this.REST_API_SERVER + '/u=' + id);
  }

  getEquiposLiga(id: number): Observable<EquipoUser[]> {
    return this.http.get<EquipoUser[]>(this.REST_API_SERVER + '/l=' + id);
  }

  //Obtiene los equiposUser de cierta liga ordenados por puntos
  getEquiposLigaOrdenados(id: number): Observable<EquipoUser[]> {
    return this.http.get<EquipoUser[]>(this.REST_API_SERVER + '/l2=' + id);
  }

  //Comprobar si existe el nombre de un equipo
  comprobarExisteNombreEquipo(nombreEquipo: string): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + '/eq=' + nombreEquipo);
  }

  //Obtener el equipo de un usuario por su id
  getEquipoUsuarioPorIDEquipoUser(
    idEquipoUser: number
  ): Observable<EquipoUser> {
    return this.http.get<EquipoUser>(
      this.REST_API_SERVER + '/e=' + idEquipoUser
    );
  }

  //Actualizamos el saldo de cierto EquipoUser
  actualizarSaldo(equipoUser: EquipoUser): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER + '/actualizarSaldo/e=' + equipoUser.id,
      equipoUser
    );
  }

  //Crear equipoUser
  crearEquipoUser(equipoUser: EquipoUserCreate): Observable<any> {
    return this.http.post<any>(
      this.REST_API_SERVER + '/crearEquipoUser',
      equipoUser
    );
  }
}
