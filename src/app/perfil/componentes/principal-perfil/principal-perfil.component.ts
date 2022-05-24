import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-principal-perfil',
  templateUrl: './principal-perfil.component.html',
  styleUrls: ['./principal-perfil.component.scss'],
})
export class PrincipalPerfilComponent implements OnInit {
  loading: boolean = false;
  posicion: string = '';
  userLogueado!: Usuario;
  equipoUser!: EquipoUser;
  equipoUserLogo: string = 'http://localhost:3000/images/logosEquiposUsers/';

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    //Obtenemos perfil usuario
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    //Obtenemos el equipo del usuario
    this.equipoUser = this.localStorage.getEquipoLocalStorage();
    //Obtenemos la posicion
    this.posicion = this.localStorage.getPosicion()!;
    console.log(this.posicion);
  }

  mostrarMensaje() {
    document.getElementById('mensaje')!.style.display = 'block';
  }

  ocultarMensaje() {
    document.getElementById('mensaje')!.style.display = 'none';
  }
}
