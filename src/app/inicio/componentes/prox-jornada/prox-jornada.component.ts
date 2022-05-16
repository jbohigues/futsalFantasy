import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { EquiposRealesService } from 'src/app/global/servicios/equipos-reales.service';
import { Calendario } from 'src/app/interfaces/calendario';
import { EquipoReal } from 'src/app/interfaces/equipo-real';
import { ProxJornadaService } from '../../servicios/prox-jornada.service';

@Component({
  selector: 'app-prox-jornada',
  templateUrl: './prox-jornada.component.html',
  styleUrls: ['./prox-jornada.component.scss'],
})
export class ProxJornadaComponent implements OnInit {
  jornadas: Calendario[] = [];
  proximaJornada!: Calendario;
  hoy = new Date();
  loading: boolean = true;
  hayMasJornadas: boolean = true;
  hayMasJornadasParrafo: string = 'No quedan más jornadas por disputar';
  diaString!: string;
  equipoLocal!: EquipoReal;
  equipoVisitante!: EquipoReal;
  imagen: string = 'http://localhost:3000/images/logosEquiposReales/';
  jornada!: number;

  //Variables para hacer la cuenta regresiva
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  constructor(
    private proxJornadaService: ProxJornadaService,
    private equiposRealesService: EquiposRealesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proxJornadaService.getProxJornada().subscribe((res) => {
      //Obtengo todas las jornadas ordenadas por fecha
      this.jornadas = res;
      let localDate;
      console.log(this.hoy);

      //Comparo las fechas obtenidas con la fecha actual, para comprobar cual es la primera proxima
      for (const jornada of this.jornadas) {
        localDate = new Date(jornada.fecha.toLocaleString());
        //Hago esto para poder quitar las 2h de diferencia horaria
        localDate.setHours(localDate.getHours() - 2);

        if (localDate > this.hoy) {
          this.proximaJornada = jornada;
          //La paso a LocaleString para poder realizar la cuenta regresiva
          this.proximaJornada.fecha = new Date(jornada.fecha.toLocaleString());
          break;
        }
      }

      if (this.proximaJornada != undefined) {
        console.log(this.proximaJornada);

        //Configuracion de la cuenta regresiva
        this.diaString = new Intl.DateTimeFormat('es-Es', {
          weekday: 'long',
        }).format(this.proximaJornada.fecha);

        this.clock = this.source.subscribe((t) => {
          this.now = new Date();
          this.end = new Date(this.proximaJornada.fecha);
          this.end.setHours(this.end.getHours() - 2);
          this.showDate();
        });

        this.equiposRealesService
          .getEquipoReal(this.proximaJornada.idLocal)
          .subscribe((equipo) => {
            this.equipoLocal = equipo;

            this.equiposRealesService
              .getEquipoReal(this.proximaJornada.idVisitante)
              .subscribe((equipo2) => {
                this.equipoVisitante = equipo2;
                this.loading = false;
              });
          });
      } else {
        this.loading = false;
        this.hayMasJornadas = false;
      }
    });
  }

  //Nos permite mostrar cuenta regresiva
  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
    if (
      this.day === 0 &&
      this.hours === 0 &&
      this.minutes === 0 &&
      this.seconds === 0
    )
      window.location.reload();
  }
}
