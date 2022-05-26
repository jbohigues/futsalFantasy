import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

export interface Clasificacion {
  id: number;
  posicion: number;
  nombreEquipo: string;
  numJugadores: number;
  difPuntos: number;
  puntos: number;
  posicionRespectoUserLogueado: number;
  foto: string;
  token: string;
}

@Component({
  selector: 'app-cuadro-clasificacion',
  templateUrl: './cuadro-clasificacion.component.html',
  styleUrls: ['./cuadro-clasificacion.component.scss'],
})
export class CuadroClasificacionComponent implements OnInit {
  loading: boolean = true; //Si ya tiene todos los datos necesarios o no
  equiposUsers: EquipoUser[] = [];
  equipoUserLogueado!: EquipoUser;
  userLogueado!: Usuario;
  posUserLogueado: number = 0;
  equiposClasificacion: Clasificacion[] = [];
  pos: number = 0;
  idBuscado!: number;
  ordenado: boolean = false;
  imagen: string = 'http://localhost:3000/images/iconsPosicionesClasificacion/';
  logoEquipo: string = 'http://localhost:3000/images/logosEquiposUsers/';

  //TABLA
  displayedColumns: string[] = [
    'posicion',
    'nombreEquipo',
    'logoEquipo',
    'numJugadores',
    'difPuntos',
    'puntos',
  ];
  dataSource!: any;

  constructor(
    private localStorage: LocalStorageService,
    private equiposUsersService: EquiposUserService,
    private router: Router
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    //Obtengo el usuario logueado
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    this.equipoUserLogueado = this.localStorage.getEquipoLocalStorage();

    //Saco los equipos que hay en la misma liga que el usuario logueado
    this.equiposUsersService
      .getEquiposLigaOrdenados(this.equipoUserLogueado.idLiga)
      .subscribe((res) => {
        this.equiposUsers = res;

        //Recorro los equipos obtenidos de esa liga
        for (let i = 0; i < this.equiposUsers.length; i++) {
          if (this.equiposUsers[i].jugadoresrealesencadaliga.length) {
            //Guardo la cantidad de jugadores que tiene ese equipo
            this.equiposUsers[i].numJugadores =
              this.equiposUsers[i].jugadoresrealesencadaliga.length;
          } else this.equiposUsers[i].numJugadores = 0;

          //Los guardo con la forma de la interfaz
          this.equiposClasificacion[i] = {
            id: this.equiposUsers[i].idUsuario,
            posicion: i + 1,
            nombreEquipo: this.equiposUsers[i].nombre,
            numJugadores: this.equiposUsers[i].numJugadores,
            difPuntos: 0,
            puntos: this.equiposUsers[i].puntos,
            posicionRespectoUserLogueado: 0,
            foto: this.equiposUsers[i].foto,
            token: this.equiposUsers[i].usuarios.token,
          };
          console.log(this.equiposClasificacion[i]);

          //Si el equipo es del usuario logueado, guardo la posicion en una variable y en el localStorage
          if (this.equiposUsers[i].idUsuario === this.userLogueado.id) {
            this.posUserLogueado = this.equiposClasificacion[i].posicion - 1;
            this.localStorage.setPosicion((i + 1).toString());
          }
        }

        //Establezco las posiciones respecto al usuario logueado, para que se vea la diferencia de puntos entre él y el resto
        this.establecerPosicionesRespectoUserLogueado(
          this.posUserLogueado,
          this.equiposClasificacion
        );
        this.dataSource = new MatTableDataSource<Clasificacion>(
          this.equiposClasificacion
        );
        this.dataSource.sort = this.sort;
        //Si tengo todos los equipos cargados, muestro la vista deseada
        if (this.equiposClasificacion.length === this.equiposUsers.length) {
          this.loading = false;
        } else this.loading = true;

        //Guardo el id del usuario logueado para que su fila en la tabla tenga una clase especial
        this.equiposClasificacion.forEach((element) => {
          if (element.id === this.userLogueado.id)
            this.idBuscado = this.userLogueado.id;
        });
      });
  }

  //Pone imagenes de mayor o superior respecto al usuario logueado para mostrar la diferencia de puntos
  establecerPosicionesRespectoUserLogueado(
    pos: number,
    array: Clasificacion[]
  ) {
    for (let i = pos + 1; i < array.length; i++) {
      array[i].posicionRespectoUserLogueado = 2;
      array[i - 1].difPuntos = array[pos].puntos - array[i - 1].puntos;
      array[array.length - 1].difPuntos =
        array[pos].puntos - array[array.length - 1].puntos;
    }

    for (let j = pos - 1; j >= 0; j--) {
      array[j].posicionRespectoUserLogueado = 1;
      array[j].difPuntos = array[j].puntos - array[pos].puntos;
    }
  }

  navigate(token: string, ruta: string, rutaActual: string) {
    this.router.navigate([ruta], {
      queryParams: { u: token, r: rutaActual },
    });
  }
}
