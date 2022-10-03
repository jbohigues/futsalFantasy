import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { LocalStorageService } from '../../servicios/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser!: Usuario;
  estilo: string = '';
  @Input() vista!: string;
  @Input() vistaLiga!: boolean;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorage.getUsuarioLocalStorage();
    if (this.vista === 'perfil') this.estilo = 'perfil';
    else this.estilo = '';
  }

  // navigate(ruta: string) {
  //   this.router.navigate([ruta], {
  //     queryParams: { u: this.currentUser.token },
  //   });
  // }

  navigate(ruta: string) {
    if (ruta === '/perfil') {
      this.router.navigate([ruta], {
        queryParams: { tok: this.currentUser.token },
      });
    } else this.router.navigate([ruta]);
  }

  logout() {
    this.localStorage.removeSession();
    this.navigate('/home');
  }
}
