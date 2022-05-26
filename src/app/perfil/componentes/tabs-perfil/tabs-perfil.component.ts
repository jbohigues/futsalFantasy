import { Component, Input, OnInit } from '@angular/core';
import { EquipoUser } from 'src/app/interfaces/equipo-user';

@Component({
  selector: 'app-tabs-perfil',
  templateUrl: './tabs-perfil.component.html',
  styleUrls: ['./tabs-perfil.component.scss'],
})
export class TabsPerfilComponent implements OnInit {
  @Input() equipoUserLogueado!: EquipoUser;

  constructor() {}

  ngOnInit(): void {}
}
