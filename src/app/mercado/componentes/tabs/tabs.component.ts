import { Component, Input, OnInit } from '@angular/core';
import { EquipoUser } from 'src/app/interfaces/equipo-user';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() miEquipo!: EquipoUser;

  constructor() {}

  ngOnInit(): void {}
}
