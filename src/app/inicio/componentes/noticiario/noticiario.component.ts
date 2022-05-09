import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Liga } from 'src/app/interfaces/liga';
import { Noticia } from 'src/app/interfaces/noticia';
import { Usuario } from 'src/app/interfaces/usuario';
import { NoticiasService } from '../../servicios/noticias.service';

//Pequeña interfaz para las opciones del select
interface Tema {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-noticiario',
  templateUrl: './noticiario.component.html',
  styleUrls: ['./noticiario.component.scss']
})
export class NoticiarioComponent implements OnInit {
  noticias: Noticia[] = [];
  dia!: string; //Para mostrar la fecha
  skip: number = 0; //Para decidir cuántas noticias mostrará
  hayNoticias: boolean = false; //Para cambiar el botón de ver más noticias
  botonNoticias: string = "Ver más noticias"; //Botón de ver más noticias: cambia el texto si no hay más
  valorSelected!: number; //Nos dice el valor numérico seleccionado en el filtro
  filtro!: string; //Tipo char: nos dirá que Tema ha filtrado: I(información), T(Traspasos)
  hayFiltro: boolean = false; //Nos dice si hay filtro o no, para realizar la búsqueda con o sin filtros.
  user!: Usuario; //Usuario logueado
  loading: boolean = true; //Si ya tiene todos los datos necesarios o no
  equipoUser!: EquipoUser; //Equipo del usuario logueado
  ligaUser!: Liga; //Liga del usuario logueado

  //Temas que puede elegir en el filtro  
  temas: Tema[] = [
    {value: 0, viewValue: 'Todas'},
    {value: 1, viewValue: 'Información'},
    {value: 2, viewValue: 'Traspasos'},
  ];

  constructor(
    private localStorage: LocalStorageService,
    private noticiasService: NoticiasService,
    private equiposUserService: EquiposUserService,
    private ligaUserService: LigaUserService
  ) { }

  ngOnInit(): void {    
    //Obtiene noticias
    this.noticiasService.getNoticias(this.skip).subscribe((res) => {
      this.obtenerNoticias(res);
      //Carga el usuario del localStorage
      this.user = this.localStorage.getUsuarioLocalStorage();
      //Creo un booleano para comprobar que tiene todos los datos, si no muestra el componente loading
      this.equiposUserService.getEquipoUsuario(this.user.id).subscribe((res2) => {
        this.equipoUser = res2;
        this.ligaUserService.getLigaUsuario(this.equipoUser.idLiga).subscribe((res3) => {
          this.ligaUser = res3;
          this.loading = false;
        });
      });
    });
  }

  //Funcion que nos da dos noticias más según haya filtro o no
  cargarMas(hayFiltro: boolean){
    this.skip += 2;
    if (!hayFiltro)
      this.noticiasService.getNoticias(this.skip).subscribe((res) => {
        this.obtenerNoticias(res);
      });
    else 
      this.noticiasService.getNoticiasConFiltro(this.skip, this.filtro).subscribe((res) => {
        this.obtenerNoticias(res);
      });
  }

  //Funcion que muestra la fecha cuando se cambia de día
  buscarCambiosDia(){
    for (let i=this.noticias.length-1; i>=0; i--) {
      this.dia = this.noticias[i].fecha.toLocaleString();
      this.dia = this.dia.slice(0,10);
      if (i===0)
        this.noticias[i].diaNuevo = true;
      else {
        if (this.dia === this.noticias[i-1].fecha.toLocaleString().slice(0,10))
          this.noticias[i].diaNuevo = false;
        else this.noticias[i].diaNuevo = true;
      }
    }
  }

  //Funcion que obtiene las noticias segun el tema
  filtrar(valor: number){
    this.hayFiltro = true;
    this.skip = 0;
    this.noticias = [];

    switch (valor){
      case 1: this.filtro = 'I'; break;
      case 2: this.filtro = 'T'; break;
      default: this.filtro = ''; this.hayFiltro = false; break;
    }

    this.noticiasService.getNoticiasConFiltro(this.skip, this.filtro).subscribe((res) => {
      this.obtenerNoticias(res);
    });
  }

  //Funcion que mete en noticias[], las noticias que recoge de la api
  obtenerNoticias(res: any){
    if (res.length){
      this.botonNoticias = "Ver más noticias";
      for (let noticia of res) {
        this.noticias.push(noticia);
        this.buscarCambiosDia();
      }
    }
    else {
      this.hayNoticias = false;
      this.botonNoticias = "No hay más noticias";
    }    
  }
}
