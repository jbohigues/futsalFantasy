import { Component, Input, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';

export interface Clasificacion {
  id: number;
  posicion: number;
  nombre: string;
  puntos: number;
  difPuntos: number;
  pos: number;
}

@Component({
  selector: 'app-mi-clasificacion',
  templateUrl: './mi-clasificacion.component.html',
  styleUrls: ['./mi-clasificacion.component.scss'],
})
export class MiClasificacionComponent implements OnInit {
  equiposUsers: EquipoUser[] = [];
  equiposClasificacion: Clasificacion[] = [];
  imagen: string = 'http://localhost:3000/images/iconsPosicionesClasificacion/';
  imagenDifPuntos: string = 'http://localhost:3000/images/system/';
  @Input() miEquipo!: EquipoUser;

  //Tabla
  displayedColumns: string[] = ['posicion', 'nombre', 'puntos', 'difPuntos'];
  dataSource!: any;

  constructor(private equiposUsersService: EquiposUserService) {}

  ngOnInit(): void {
    //Obtengo los equipos de la liga ordenados por puntos
    this.equiposUsersService
      .getEquiposLigaOrdenados(this.miEquipo.idLiga)
      .subscribe((res) => {
        console.log(res);

        this.equiposUsers = res;

        //Los recorro para ver cual es el equipo del usuario logueado
        for (let i = 0; i < this.equiposUsers.length; i++) {
          if (this.equiposUsers[i].id === this.miEquipo.id) {
            let num = 0;
            //Guardo 3 equipos: el del usuario logueado, el anterior y el posterior
            for (let j = i - 1; j <= i + 1; j++) {
              if (this.equiposUsers[j] != undefined) {
                //Los guardo segun esta interfaz para poder mostrarlos en forma de tabla
                this.equiposClasificacion[num] = {
                  id: this.equiposUsers[j].id,
                  posicion: j + 1,
                  nombre: this.equiposUsers[j].nombre,
                  puntos: this.equiposUsers[j].puntos,
                  difPuntos: this.equiposUsers[j].puntos,
                  pos: j,
                };
                num++;
              }
            }
          }
        }
        //Elimino del array los que sean undefined
        this.dataSource = this.equiposClasificacion;
        for (let i = 1; i <= this.dataSource.length; i++) {
          if (this.dataSource[i] === undefined) {
            this.dataSource.slice(i, 1);
          }
        }
        console.log(this.dataSource);
        if (this.dataSource.length === 3) {
          //Saco la diferencia de puntos respecto al equipo del usuario logueado
          this.dataSource[0].difPuntos =
            this.dataSource[0].puntos - this.dataSource[1].puntos;
          this.dataSource[2].difPuntos =
            this.dataSource[1].puntos - this.dataSource[2].puntos;
          this.dataSource[1].difPuntos = 0;
          this.dataSource[0].pos = 1;
          this.dataSource[2].pos = 3;
        }
      });
  }
}
