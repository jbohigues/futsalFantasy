import { Component, OnInit } from '@angular/core';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { Liga } from 'src/app/interfaces/liga';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cuadro-liga',
  templateUrl: './cuadro-liga.component.html',
  styleUrls: ['./cuadro-liga.component.scss']
})
export class CuadroLigaComponent implements OnInit {
  liga!: Liga;
  userLogueado!: Usuario;
  loading: boolean = true;
  imagen: string = "http://localhost:3000/images/logosLigas/";
  
  constructor(private localStorage: LocalStorageService,
    private ligaService: LigaUserService) { }

  ngOnInit(): void {
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    this.ligaService.getLigaUsuario(this.userLogueado.id).subscribe((res) => {
      this.liga = res;
      this.loading = false;
    })
  }

}
