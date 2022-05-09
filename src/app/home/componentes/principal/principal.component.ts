import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { Card } from 'src/app/interfaces/card';
import { Usuario } from 'src/app/interfaces/usuario';
import { CardshomeService } from '../../servicios/cardshome.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  /** VARIABLES */
  cards: Card[] = [];
  currentUser!: Usuario;

  /** CONSTRUCTOR */
  constructor(
    private cardshomeService: CardshomeService, 
    private localStorage: LocalStorageService,
    private router: Router) { }

  /** FUNCIONES */
  //Carga los cards en el onInit para mostrarlos en el home
  ngOnInit(): void {
    if (this.localStorage.getIsLogin())
      this.currentUser = this.localStorage.getUsuarioLocalStorage();
    this.cardshomeService.getCardsHome().subscribe((res) => {
      this.cards = res;
    });
  }

  //Funcion que nos hace scroll directamente al apartado de iniciar sesion
  scroll(){
    var elmnt = document.getElementById("cuadroLogin");
    elmnt!.scrollIntoView({block:'center' ,behavior: "smooth"});
  }

  //Funcion para ir a la pantalla de inicio
  navigateToInicio(){
    this.router.navigate(["/inicio"]);
  }

}
