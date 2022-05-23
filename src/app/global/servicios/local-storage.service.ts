import { Injectable } from '@angular/core';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';
import { EquiposUserService } from './equipos-user.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isLogin: boolean = false;
  private currentUser!: Usuario;
  private equipoUser!: EquipoUser;

  constructor(private equipoUserService: EquiposUserService) {}

  //Guardamos la sesion de usuario en el localStorage (user, boolean isLogin y token)
  setSession(user: Usuario) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.equipoUserService.getEquipoUsuario(user.id).subscribe((res) => {
      this.equipoUser = res;
      this.isLogin = true;

      localStorage.setItem('equipoUser', JSON.stringify(this.equipoUser));
      localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
      localStorage.setItem('token', JSON.stringify(user.token));
    });
  }

  //Borramos los datos del localStorage: para cerrar sesión
  removeSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('equipoUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    this.isLogin = false;
  }

  //Devuelve un boolean segun tengamos la variable isLogin en localStorage o no
  getIsLogin(): boolean {
    const islogin = localStorage.getItem('isLogin');
    if (islogin != null) return true;
    else return false;
  }

  //Guardamos en localStorage los nuevos datos cambiados del usuario
  setUser(usuario: Usuario) {
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    this.currentUser = usuario;
    this.isLogin = true;
    localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
  }

  //Guardamos los nuevos datos del equipoUser
  setEquipoUser(equipoUser: EquipoUser) {
    console.log(equipoUser);

    localStorage.setItem('equipoUser', JSON.stringify(equipoUser));
  }

  //Devuelve el usuario del localStorage como Usuario
  getUsuarioLocalStorage() {
    this.currentUser = JSON.parse(
      String(localStorage.getItem('currentUser'))
    ) as Usuario;
    return this.currentUser;
  }

  //Devuelve el equipo del usuario logueado (del localStorage) como EquipoUser
  getEquipoLocalStorage() {
    return (this.equipoUser = JSON.parse(
      String(localStorage.getItem('equipoUser'))
    ) as EquipoUser);
  }
}
