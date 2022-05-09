import { Component, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-mercado',
  templateUrl: './principal-mercado.component.html',
  styleUrls: ['./principal-mercado.component.scss'],
})
export class PrincipalMercadoComponent implements OnInit {
  capital: string = '';
  loading: boolean = true;
  usuarioLogueado!: Usuario;
  equipoUserLogueado!: EquipoUser;

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
        this.capital = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(this.equipoUserLogueado.dinero);
        if (this.equipoUserLogueado != undefined) this.loading = false;
      });
  }
}
