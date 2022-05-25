import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LogosEquipoUserServiceService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'logosEquipoUsers';

  constructor(private http: HttpClient) {}

  //Obtiene todos los logos guardados en la bd
  getLogosEqUs(): Observable<any> {
    return this.http.get<any>(this.REST_API_SERVER + '/logosEqUs');
  }
}
