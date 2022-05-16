import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puja, Traspaso } from 'src/app/interfaces/traspaso';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TraspasosService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'traspasos';

  constructor(private http: HttpClient) {}

  //Pujar por un jugador
  pujarPorJugador(traspaso: Puja): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/puja', traspaso);
  }

  //Comprobar si un usuario ya ha pujado por cierto jugador
  comprobarExistePuja(idJugador: number, idEmisor: number): Observable<any> {
    return this.http.get<any>(
      this.REST_API_SERVER + '/j=' + idJugador + '/e=' + idEmisor
    );
  }

  //Cambia la puja de un jugador real
  actualizarPuja(puja: Traspaso): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER + '/update/p=' + puja.id,
      puja
    );
  }

  //Cambia la puja de un jugador real
  retirarPuja(traspaso: Traspaso): Observable<any> {
    return this.http.delete<any>(
      this.REST_API_SERVER + '/retirarPuja/p=' + traspaso.id
    );
  }

  //Obtener pujas de un usuario
  getMisPujas(idUser: number): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + '/pujas/j=' + idUser);
  }
}
