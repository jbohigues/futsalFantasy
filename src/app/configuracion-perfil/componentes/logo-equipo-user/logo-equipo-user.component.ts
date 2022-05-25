import { Component, Input, OnInit } from '@angular/core';
import { LogosEquipoUserServiceService } from 'src/app/global/servicios/logos-equipo-user-service.service';
import { LogoEquipoUser } from 'src/app/interfaces/logo-equipo-user';

@Component({
  selector: 'app-logo-equipo-user',
  templateUrl: './logo-equipo-user.component.html',
  styleUrls: ['./logo-equipo-user.component.scss'],
})
export class LogoEquipoUserComponent implements OnInit {
  logoEquipo: string = 'http://localhost:3000/images/logosEquiposUsers/';
  @Input() logo!: LogoEquipoUser;

  constructor() {}

  ngOnInit(): void {}
}
