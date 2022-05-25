import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-perfil',
  templateUrl: './principal-perfil.component.html',
  styleUrls: ['./principal-perfil.component.scss'],
})
export class PrincipalPerfilComponent implements OnInit {
  loading: boolean = false;
  soyUserLider: boolean = false;
  posicion: string = '';
  userLogueado!: Usuario;
  equipoUser!: EquipoUser;
  equipoUserLogo: string = 'http://localhost:3000/images/logosEquiposUsers/';
  idUserLider: number = 0;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private ligaService: LigaUserService
  ) {}

  ngOnInit(): void {
    //Obtenemos perfil usuario
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    //Obtenemos el equipo del usuario
    this.equipoUser = this.localStorage.getEquipoLocalStorage();
    //Obtenemos la posicion
    this.posicion = this.localStorage.getPosicion()!;
    console.log(this.posicion);
    //Obtener el usuario lider de esta liga
    this.ligaService.getLigaUsuario(this.equipoUser.idLiga).subscribe((res) => {
      console.log(res);
      this.idUserLider = res.idUsuarioLider;
      if (this.idUserLider === this.userLogueado.id) this.soyUserLider = true;
    });
  }

  mostrarMensaje() {
    document.getElementById('mensaje')!.style.display = 'block';
  }

  ocultarMensaje() {
    document.getElementById('mensaje')!.style.display = 'none';
  }

  mostrarMensajeConf() {
    document.getElementById('conf')!.style.display = 'block';
  }

  ocultarMensajeConf() {
    document.getElementById('conf')!.style.display = 'none';
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }
}
