import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { LiderLiga } from 'src/app/interfaces/lider-liga';
import { Liga } from 'src/app/interfaces/liga';
import { Usuario } from 'src/app/interfaces/usuario';
import { EquiposUserService } from './equipos-user.service';
import { LigaUserService } from './liga-user.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isLogin: boolean = false;
  private currentUser!: Usuario;
  private equipoUser!: EquipoUser;
  private posicion!: string;
  private liga!: Liga;
  private valido!: boolean;
  private liderLiga!: LiderLiga;

  constructor(
    private equipoUserService: EquiposUserService,
    private ligaService: LigaUserService
  ) {}

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

      this.ligaService
        .getLigaUsuario(this.equipoUser.idLiga)
        .subscribe((res2) => {
          console.log(res2);
          if (res2) this.liga = res2;
          if (this.liga.idUsuarioLider === this.currentUser.id) {
            this.liderLiga = {
              idUser: user.id,
              idLiga: this.liga.id,
            };
            localStorage.setItem('liderLiga', JSON.stringify(this.liderLiga));
          }
        });
    });
  }

  //Borramos los datos del localStorage: para cerrar sesión
  removeSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('equipoUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('posicion');
    localStorage.removeItem('liderLiga');
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

  //Guardamos la posición en la clasificación
  setPosicion(pos: string) {
    localStorage.setItem('posicion', JSON.stringify(pos));
  }

  //Devuelve la posicion del localStorage
  getPosicion() {
    return JSON.parse(String(localStorage.getItem('posicion')));
  }

  //Saber si un user es lider en cierta liga
  getUserLider() {
    return (this.liderLiga = JSON.parse(
      String(localStorage.getItem('liderLiga'))
    ) as LiderLiga);
  }
}
