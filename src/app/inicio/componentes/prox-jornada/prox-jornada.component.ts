import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { EquiposRealesService } from 'src/app/global/servicios/equipos-reales.service';
import { Calendario } from 'src/app/interfaces/calendario';
import { EquipoReal } from 'src/app/interfaces/equipo-real';
import { ProxJornadaService } from '../../servicios/prox-jornada.service';

@Component({
  selector: 'app-prox-jornada',
  templateUrl: './prox-jornada.component.html',
  styleUrls: ['./prox-jornada.component.scss']
})
export class ProxJornadaComponent implements OnInit {
  jornadas: Calendario[] = [];
  loading: boolean = true;
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
    private equiposRealesService: EquiposRealesService) { }

  ngOnInit(): void {
    //Hay que pasarle el num de jornada
    this.jornada = 1;

    this.proxJornadaService.getProxJornada(this.jornada).subscribe((res) => {
      //Obtengo todas las jornadas ordenadas por fecha y me quedo con la primera
      this.jornadas = res;
      this.jornadas[0].fecha = new Date(this.jornadas[0].fecha.toLocaleString());
      this.diaString = new Intl.DateTimeFormat('es-Es', {weekday: 'long'}).format(this.jornadas[0].fecha);
      
      this.clock = this.source.subscribe(t => {
        this.now = new Date();
        this.end = new Date(this.jornadas[0].fecha);
        this.showDate();
      });

      this.equiposRealesService.getEquipoReal(this.jornadas[0].idLocal).subscribe((equipo) => {
        this.equipoLocal = equipo;
        
        this.equiposRealesService.getEquipoReal(this.jornadas[0].idVisitante).subscribe((equipo2) => {
          this.equipoVisitante = equipo2;
          this.loading = false;
        });
      });
    });
  }

  //Nos permite mostrar cuenta regresiva
  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }
}
