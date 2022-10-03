import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { UsuariosService } from 'src/app/home/servicios/usuarios.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-perfil',
  templateUrl: './principal-perfil.component.html',
  styleUrls: ['./principal-perfil.component.scss'],
})
export class PrincipalPerfilComponent implements OnInit {
  loading: boolean = true;
  miPerfil: boolean = false;
  soyUserLider: boolean = false;
  posicion: string = '';
  userLogueado!: Usuario;
  equipoUser!: EquipoUser;
  equipoUserLogo: string = 'http://localhost:3000/images/logosEquiposUsers/';
  idUserLider: number = 0;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
    private ligaService: LigaUserService,
    private userService: UsuariosService,
    private equiposService: EquiposUserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.token = this.localStorage.getToken();
      if (params.tok === this.token) {
        //Es el perfil del userLogueado
        this.miPerfil = true;
        //Obtenemos perfil usuario
        this.userLogueado = this.localStorage.getUsuarioLocalStorage();
        //Obtenemos el equipo del usuario
        this.equipoUser = this.localStorage.getEquipoLocalStorage();
        //Obtenemos la posicion
        this.posicion = this.localStorage.getPosicion()!;
        //Obtener el usuario lider de esta liga
        this.ligaService
          .getLigaUsuario(this.equipoUser.idLiga)
          .subscribe((res) => {
            this.idUserLider = res.idUsuarioLider;
            if (this.idUserLider === this.userLogueado.id)
              this.soyUserLider = true;
            this.loading = false;
          });
      } else {
        //Si vamos a un perfil distinto del usuario logueado
        this.userService
          .getUsuarioPorToken(params.tok)
          .subscribe((res: any) => {
            this.posicion = params.pos;
            if (res.status === 'existe') {
              //Obtenemos el usuario del perfil seleccionado
              this.userLogueado = res.user;
              //Obtenemos su equipo
              this.equiposService
                .getEquipoUsuario(this.userLogueado.id)
                .subscribe((res2) => {
                  if (res2) {
                    this.equipoUser = res2;
                    this.loading = false;
                  }
                });
            }
          });
      }
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
