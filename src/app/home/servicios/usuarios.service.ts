import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.REST_API_SERVER);
  }

  getUsuario(usuario:string, password:string): Observable<Usuario> {
    return this.http.get<Usuario>(this.REST_API_SERVER + "/u=" +usuario + "/p=" + password);
  }

  getUsuarioConUsuario(usuario: string): any {
    return this.http.get<any>(this.REST_API_SERVER + "/u=" +usuario);
  }

  getUsuarioConEmail(email: string): any {
    return this.http.get<any>(this.REST_API_SERVER + "/e=" +email);
  }

  registrarUsuario(nombre: string, apellidos: string, usuario: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/registro', {
      nombre: nombre, apellidos: apellidos, usuario: usuario, email: email, password: password,
    });
  }
}
