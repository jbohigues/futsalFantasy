import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuntosLiga } from 'src/app/interfaces/puntos-liga';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PuntosLigaService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'puntosLiga';

  constructor(private http: HttpClient) {}

  //Obtiene los puntos de cada accion guardadas en la configuracion
  getPuntosLiga(idLiga: number): Observable<PuntosLiga> {
    return this.http.get<PuntosLiga>(this.REST_API_SERVER + '/idL=' + idLiga);
  }
}
