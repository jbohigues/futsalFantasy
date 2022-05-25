import { Component, OnInit } from '@angular/core';
import { LogosEquipoUserServiceService } from 'src/app/global/servicios/logos-equipo-user-service.service';
import { LogoEquipoUser } from 'src/app/interfaces/logo-equipo-user';

@Component({
  selector: 'app-dialog-perfil',
  templateUrl: './dialog-perfil.component.html',
  styleUrls: ['./dialog-perfil.component.scss'],
})
export class DialogPerfilComponent implements OnInit {
  logosBD: LogoEquipoUser[] = [];

  constructor(private logosService: LogosEquipoUserServiceService) {}

  ngOnInit(): void {
    this.logosService.getLogosEqUs().subscribe((res) => {
      console.log(res);
      if (res) this.logosBD = res;
    });
  }
}
