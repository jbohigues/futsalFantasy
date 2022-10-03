import { Component, OnInit } from '@angular/core';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { PuntosLigaService } from 'src/app/global/servicios/puntos-liga.service';
import { ProxJornadaService } from 'src/app/inicio/servicios/prox-jornada.service';
import { Calendario } from 'src/app/interfaces/calendario';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { PuntosLiga } from 'src/app/interfaces/puntos-liga';
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
  jornadas: Calendario[] = [];
  hoy = new Date();
  jornadaActual!: Calendario;
  puntosLiga!: PuntosLiga;

  constructor(
    private localStorage: LocalStorageService,
    private equipoUserService: EquiposUserService,
    private proxJornadaService: ProxJornadaService,
    private puntosLigaService: PuntosLigaService
  ) {}

  ngOnInit(): void {
    //Obtengo el usuario logueado
    this.usuarioLogueado = this.localStorage.getUsuarioLocalStorage();

    //Obtengo el equipo del usuario logueado
    this.equipoUserService
      .getEquipoUsuario(this.usuarioLogueado.id)
      .subscribe((res) => {
        this.equipoUserLogueado = res;

        this.puntosLigaService
          .getPuntosLiga(this.equipoUserLogueado.idLiga)
          .subscribe((res) => {
            this.puntosLiga = res;
          });
        // if (this.equipoUserLogueado != undefined) this.loading = false;

        this.proxJornadaService.getProxJornada().subscribe((res) => {
          //Obtengo todas las jornadas ordenadas por fecha
          this.jornadas = res;
          let localDate;

          //Comparo las fechas obtenidas con la fecha actual, para comprobar cual es la primera proxima
          for (let i = 0; i < this.jornadas.length; i++) {
            localDate = new Date(this.jornadas[i + 1].fecha.toLocaleString());
            if (this.jornadas[i].jugado === true && localDate > this.hoy) {
              this.jornadaActual = this.jornadas[i];
              this.loading = false;
              break;
            }
          }

          // if (localDate > this.hoy) {
          //   this.proximaJornada = jornada;
          //   //La paso a LocaleString para poder realizar la cuenta regresiva
          //   this.proximaJornada.fecha = new Date(
          //     jornada.fecha.toLocaleString()
          //   );
          // }
        });
      });
  }

  // HAY QUE SACAR LA PROXIMA JORNADA COMO EN PROXJORNADA COMPONENT
  // PENSAR COMO HACER PARA SABER SI ESTAMOS DENTRO DE UNA JORNADA
  // O ESPERANDO A QUE EMPIECE OTRA
}
