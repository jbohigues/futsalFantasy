import { Component, Input, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Liga } from 'src/app/interfaces/liga';

@Component({
  selector: 'app-info-equipo-user',
  templateUrl: './info-equipo-user.component.html',
  styleUrls: ['./info-equipo-user.component.scss'],
})
export class InfoEquipoUserComponent implements OnInit {
  @Input() equipoUser!: EquipoUser;
  @Input() ligaUser!: Liga;
  imagen: string = 'http://localhost:3000/images/logosEquiposUsers/';
  equiposUsers: EquipoUser[] = [];
  posicion: number = 0;
  capital: string = '';

  constructor(private equiposUsersService: EquiposUserService) {}

  ngOnInit(): void {
    //Obtengo los equipos de la liga ordenados por puntos
    this.equiposUsersService
      .getEquiposLigaOrdenados(this.equipoUser.idLiga)
      .subscribe((res) => {
        this.equiposUsers = res;
        for (let i = 0; i < this.equiposUsers.length; i++) {
          if (this.equiposUsers[i].id === this.equipoUser.id) {
            this.posicion = i + 1;
          }
        }
        this.capital = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(this.equipoUser.dinero);
      });
  }
}
