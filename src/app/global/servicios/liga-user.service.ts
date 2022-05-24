import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga, LigaCreate } from 'src/app/interfaces/liga';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LigaUserService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'ligaUser';

  constructor(private http: HttpClient) {}

  //Obtener la liga de cierto usuario
  getLigaUsuario(id: number): Observable<Liga> {
    return this.http.get<Liga>(this.REST_API_SERVER + '/u=' + id);
  }

  //Comprobar si existe una liga con cierto nombre
  comprobarExisteNombreLiga(nombreLiga: string): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + '/l=' + nombreLiga);
  }

  //Comprobar si existe una liga con cierto codigo
  comprobarExisteCodigoLiga(codigoLiga: string): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + '/liga/c=' + codigoLiga);
  }

  //Crear liga nueva
  crearLiga(liga: LigaCreate): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/crearLiga', liga);
  }
}
