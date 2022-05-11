import { Component, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-jornada',
  templateUrl: './principal-jornada.component.html',
  styleUrls: ['./principal-jornada.component.scss'],
})
export class PrincipalJornadaComponent implements OnInit {
  loading: boolean = true;
  equipoUserLogueado!: EquipoUser;
  usuarioLogueado!: Usuario;

  constructor(
    private localStorage: LocalStorageService,
    private equipoUserService: EquiposUserService
  ) {}

  ngOnInit(): void {
    //Obtengo el usuario logueado
    this.usuarioLogueado = this.localStorage.getUsuarioLocalStorage();

    //Obtengo el equipo del usuario logueado
    this.equipoUserService
      .getEquipoUsuario(this.usuarioLogueado.id)
      .subscribe((res) => {
        this.equipoUserLogueado = res;

        if (this.equipoUserLogueado != undefined) this.loading = false;
      });
  }

  // HAY QUE SACAR LA PROXIMA JORNADA COMO EN PROXJORNADA COMPONENT
  // PENSAR COMO HACER PARA SABER SI ESTAMOS DENTRO DE UNA JORNADA
  // O ESPERANDO A QUE EMPIECE OTRA
}
