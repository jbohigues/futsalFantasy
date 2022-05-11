import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puja } from 'src/app/interfaces/traspaso';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TraspasosService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'traspasos';

  constructor(private http: HttpClient) {}

  //Pujar por un jugador
  traspasarJugador(traspaso: Puja): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/puja', traspaso);
  }
}
