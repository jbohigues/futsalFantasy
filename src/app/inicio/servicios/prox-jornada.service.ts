import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendario } from 'src/app/interfaces/calendario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProxJornadaService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'proxJornada';

  constructor(private http: HttpClient) {}

  //HABRA QUE VER CÓMO HACEMOS PARA SABER QUÉ JORNADA SERÁ LA PROXIMA
  //Variable global??
  getProxJornada(id:number): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(this.REST_API_SERVER + "/j=" + id);
  }
}
