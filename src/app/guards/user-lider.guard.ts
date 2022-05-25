import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LigaUserService } from '../global/servicios/liga-user.service';
import { LocalStorageService } from '../global/servicios/local-storage.service';
import { EquipoUser } from '../interfaces/equipo-user';
import { LiderLiga } from '../interfaces/lider-liga';
import { Liga } from '../interfaces/liga';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserLiderGuard implements CanActivate {
  liderLiga!: LiderLiga;
  userLogueado!: Usuario;
  equipoUser!: EquipoUser;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    this.equipoUser = this.localStorage.getEquipoLocalStorage();
    this.liderLiga = this.localStorage.getUserLider();
    if (this.liderLiga) {
      if (
        this.liderLiga.idUser === this.userLogueado.id &&
        this.liderLiga.idLiga === this.equipoUser.idLiga
      )
        return true;
      else {
        alert('No eres el líder de esta liga');
        this.router.navigate(['inicio']);
        return false;
      }
    } else {
      alert('No eres el líder de esta liga');
      this.router.navigate(['inicio']);
      return false;
    }
  }
}
