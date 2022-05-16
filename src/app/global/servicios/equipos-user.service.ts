import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EquiposUserService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'equiposUser';

  constructor(private http: HttpClient) {}

  getEquipoUsuario(id: number): Observable<EquipoUser> {
    return this.http.get<EquipoUser>(this.REST_API_SERVER + '/u=' + id);
  }

  getEquiposLiga(id: number): Observable<EquipoUser[]> {
    return this.http.get<EquipoUser[]>(this.REST_API_SERVER + '/l=' + id);
  }

  getEquiposLigaOrdenados(id: number): Observable<EquipoUser[]> {
    return this.http.get<EquipoUser[]>(this.REST_API_SERVER + '/l2=' + id);
  }

  getEquipoUsuarioPorIDEquipoUser(
    idEquipoUser: number
  ): Observable<EquipoUser> {
    return this.http.get<EquipoUser>(
      this.REST_API_SERVER + '/e=' + idEquipoUser
    );
  }
}
