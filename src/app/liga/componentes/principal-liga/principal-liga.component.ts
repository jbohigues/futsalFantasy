import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-liga',
  templateUrl: './principal-liga.component.html',
  styleUrls: ['./principal-liga.component.scss'],
})
export class PrincipalLigaComponent implements OnInit {
  userLogueado!: Usuario;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }
}
