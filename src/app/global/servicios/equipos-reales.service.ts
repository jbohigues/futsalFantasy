import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoReal } from 'src/app/interfaces/equipo-real';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EquiposRealesService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'equiposReales';

  constructor(private http: HttpClient) {}

  getEquipoReal(id: number): Observable<EquipoReal> {
    return this.http.get<EquipoReal>(this.REST_API_SERVER + "/eq=" + id);
  }
}
