import { Component, Input, OnInit } from '@angular/core';
import { Noticia } from 'src/app/interfaces/noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {
  @Input() noticia!: Noticia;
  hora!: string;
  imagen: string = 'http://localhost:3000/images/iconsNoticias/';

  constructor() {}

  ngOnInit(): void {
    //Esto me quita la diferencia horaria, antes me sumaba 1h
    this.hora = this.noticia.fecha.toLocaleString();
    this.hora = this.hora.slice(11,16);
    if (this.noticia.tema === 'I')
      this.imagen += "info";
    else this.imagen += "transfer";
  }

  entrar(){
    this.imagen = this.imagen+"_hover";
  }

  salir(){
    this.imagen = this.imagen.replace("_hover", "");
  }

}
