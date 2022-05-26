import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'usuarios';

  constructor(private http: HttpClient) {}

  //Obtiene todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.REST_API_SERVER);
  }

  //Obtiene el usuario logueado a través de usuario y password
  getUsuario(usuario: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      this.REST_API_SERVER + '/u=' + usuario + '/p=' + password
    );
  }

  //Comprueba si existe un usuario con cierto nombre de usuario
  getUsuarioConUsuario(usuario: string): any {
    return this.http.get<any>(this.REST_API_SERVER + '/u=' + usuario);
  }

  //Comprueba si existe un usuario con un email especifico
  getUsuarioConEmail(email: string): any {
    return this.http.get<any>(this.REST_API_SERVER + '/e=' + email);
  }

  //Devuelve usuario a través de su id
  getUsuarioPorId(idUser: number): any {
    return this.http.get<any>(this.REST_API_SERVER + '/usuario/i=' + idUser);
  }

  //Devuelve usuario a través de su id
  getUsuarioPorToken(token: string): any {
    return this.http.get<any>(this.REST_API_SERVER + '/usuario/t=' + token);
  }

  //Crea un nuevo usuario
  registrarUsuario(
    nombre: string,
    apellidos: string,
    usuario: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/registro', {
      nombre: nombre,
      apellidos: apellidos,
      usuario: usuario,
      email: email,
      password: password,
    });
  }

  //Actualiza los datos de un usuario
  actualizarUsuario(user: Usuario): Observable<any> {
    return this.http.put<any>(
      this.REST_API_SERVER + '/update/u=' + user.id,
      user
    );
  }
}
