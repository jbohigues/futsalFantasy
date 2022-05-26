import { Component, Input, OnInit } from '@angular/core';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { TraspasosService } from 'src/app/global/servicios/traspasos.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { JugadorRealEnCadaLiga } from 'src/app/interfaces/jugador-real-en-cada-liga';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() miEquipo!: EquipoUser;
  jugadoresMercado: JugadorRealEnCadaLiga[] = [];
  ofertas: any;
  hayPujas: boolean = false;
  hayOfertas: boolean = false;
  loading: boolean = true;

  constructor(
    private jugadoresRealesService: JugadoresRealesService,
    private traspasosService: TraspasosService
  ) {}

  ngOnInit(): void {
    if (this.miEquipo != undefined) this.loading = false;

    //Obtengo los jugadores puestos en el mercado de fichajes
    this.jugadoresRealesService
      .getJugadoresMercado(this.miEquipo.idLiga)
      .subscribe((res) => {
        this.jugadoresMercado = res;
        this.jugadoresMercado.forEach((jugador) => {
          if (jugador.idEquipoUser === this.miEquipo.id) this.hayPujas = true;
        });
      });

    //Compruebo si tengo ofertas, es decir, si alguien ha pujado por mis jugadores
    this.traspasosService.getOfertas(this.miEquipo.id).subscribe((res2) => {
      if (res2.status === 'hayOfertas') {
        this.hayOfertas = true;
        this.ofertas = res2.traspaso;
      }
    });
  }
}
