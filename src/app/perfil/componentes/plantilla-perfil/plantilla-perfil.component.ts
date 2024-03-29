import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jugadores2 } from 'src/app/alineacion/componentes/principal-alineacion/principal-alineacion.component';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';

@Component({
  selector: 'app-plantilla-perfil',
  templateUrl: './plantilla-perfil.component.html',
  styleUrls: ['./plantilla-perfil.component.scss'],
})
export class PlantillaPerfilComponent implements OnInit {
  loading: boolean = false;
  valor: number = 0;
  valorString: string = '';
  misJugadores: any = [];
  jugadores: any[] = [];
  @Input() equipoUserLogueado!: EquipoUser;

  imagen: string = 'http://localhost:3000/images/fotosJugadoresReales/';
  imagenEstado: string = 'http://localhost:3000/images/iconsEstadoJugador/';
  imagenEquipoReal: string = 'http://localhost:3000/images/logosEquiposReales/';

  //TABLA
  displayedColumns: string[] = [
    'jugador',
    'equipoReal',
    'estado',
    'posicion',
    'alias',
    'capital',
    'puntos',
  ];
  dataSource: any;

  constructor(
    private localStorage: LocalStorageService,
    private equipoUserService: EquiposUserService
  ) {}

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    //Me guardo en un array los jugadores del equipo del usuario logueado
    this.equipoUserLogueado.jugadoresrealesencadaliga.forEach(
      (element: any) => {
        this.misJugadores.push(element.jugadoresreales);
      }
    );

    //Guardo en un array los jugadores con el formato Jugadores
    this.misJugadores.forEach((jugador: any) => {
      this.jugadores.push({
        id: jugador.id,
        jugador: jugador.foto,
        estado: jugador.estado,
        posicion: jugador.posicion,
        alias: jugador.alias,
        puntos: jugador.puntos,
        capital: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
          currencySign: 'accounting',
        }).format(jugador.valorMercado),
        equipoReal: jugador.equiposreales.foto,
      });
      this.valor += jugador.valorMercado;
    });

    //Formateo el valor del equipo
    this.valorString = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.valor);

    this.dataSource = new MatTableDataSource<Jugadores2>(this.jugadores);
    this.dataSource.sort = this.sort;
    this.loading = false;
  }
}
