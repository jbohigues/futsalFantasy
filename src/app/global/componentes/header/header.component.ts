import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { LocalStorageService } from '../../servicios/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: Usuario;

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.localStorage.getUsuarioLocalStorage();
  }

  navigate(ruta:string){
    this.router.navigate([ruta]);
  }

  logout(){
    this.localStorage.removeSession();
    this.navigate("/home");
  }

}
