import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/home/servicios/usuarios.service';
import { Liga } from 'src/app/interfaces/liga';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-info-liga',
  templateUrl: './info-liga.component.html',
  styleUrls: ['./info-liga.component.scss'],
})
export class InfoLigaComponent implements OnInit {
  loading: boolean = true;
  dinero: string = '';
  usuarioLider!: Usuario;
  imagen: string = 'http://localhost:3000/images/logosLigas/';
  @Input() liga!: Liga;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.dinero = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(this.liga.abono);
    this.usuariosService
      .getUsuarioPorId(this.liga.idUsuarioLider)
      .subscribe((res: any) => {
        if (res.status === 'existe') {
          this.usuarioLider = res.user;
          this.loading = false;
        }
      });
  }
}
