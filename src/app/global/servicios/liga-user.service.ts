import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liga } from 'src/app/interfaces/liga';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LigaUserService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'ligaUser';

  constructor(private http: HttpClient) {}

  getLigaUsuario(id: number): Observable<Liga> {
    return this.http.get<Liga>(this.REST_API_SERVER + "/u=" + id);
  }
}
