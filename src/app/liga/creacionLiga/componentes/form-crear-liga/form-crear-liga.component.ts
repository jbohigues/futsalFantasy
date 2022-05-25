import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { PuntosLigaService } from 'src/app/global/servicios/puntos-liga.service';
import { EquipoUser, EquipoUserCreate } from 'src/app/interfaces/equipo-user';
import {
  JugadorMercado,
  JugadorRealEnCadaLiga,
  JugadorRealEnCadaLigaCreate,
} from 'src/app/interfaces/jugador-real-en-cada-liga';
import { LigaCreate } from 'src/app/interfaces/liga';
import { PuntosLigaCreate } from 'src/app/interfaces/puntos-liga';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-form-crear-liga',
  templateUrl: './form-crear-liga.component.html',
  styleUrls: ['./form-crear-liga.component.scss'],
})
export class FormCrearLigaComponent implements OnInit {
  crearLigaForm!: FormGroup;
  liga!: LigaCreate;
  equipoUser!: EquipoUserCreate;
  equipoUserLogueado!: EquipoUser;
  userLogueado!: Usuario;
  jugadoresLibres: JugadorRealEnCadaLiga[] = [];
  jugadoresParaMiEquipo: JugadorRealEnCadaLiga[] = [];
  jugador!: JugadorRealEnCadaLigaCreate;
  jugadores: number = 0;
  jugadoresMercado: number = 0;
  posibleMercado: number = 0;
  jugadorAMercado!: JugadorMercado;
  puntosLiga!: PuntosLigaCreate;

  map: Map<string, boolean> = new Map();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private ligaService: LigaUserService,
    private equiposService: EquiposUserService,
    private localStorage: LocalStorageService,
    private jugadoresService: JugadoresRealesService,
    private puntosService: PuntosLigaService
  ) {
    this.crearLigaForm = this.formBuilder.group({
      nombreLiga: ['', [Validators.required, Validators.minLength(6)]],
      nombreEquipo: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    //Obtener datos del usuario
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    //Inicializamos map
    this.map.set('PT', false);
    this.map.set('CI', false);
    this.map.set('AL', false);
    this.map.set('AL2', false);
    this.map.set('PV', false);
  }

  //Comprueba que existe ese usuario con esa contraseña
  crearLiga(usuarioForm: FormGroup) {
    const { nombreLiga, nombreEquipo } = usuarioForm.value;

    if (nombreLiga === '' && nombreEquipo === '')
      this.openSnackBar('Debe rellenar los campos.');
    else {
      //CREAR NUEVA LIGA
      this.liga = {
        nombre: nombreLiga,
        codigoLiga: '',
        idUsuarioLider: this.userLogueado.id,
      };
      //Creamos la nueva liga
      this.ligaService.crearLiga(this.liga).subscribe((res) => {
        if (res.status === 'exito') {
          this.puntosLiga = {
            idLiga: res.liga.id,
          };
          this.puntosService.crearLiga(this.puntosLiga).subscribe((res6) => {
            if (res6.status === 'creado') {
              //Inicializamos nuevo equipo
              this.equipoUser = {
                idLiga: res.liga.id,
                idUsuario: this.userLogueado.id,
                nombre: nombreEquipo,
              };
              //Creamos nuevo equipo
              this.equiposService
                .crearEquipoUser(this.equipoUser)
                .subscribe((res2) => {
                  if (res2.status === 'exito') {
                    this.jugadoresService
                      .obtenerJugadoresReales()
                      .subscribe((res3) => {
                        //Obtenemos todos los jugadores reales y los ordenamos aleatoriamente
                        this.jugadoresLibres = res3.jugadores;
                        this.jugadoresLibres.sort(function () {
                          return Math.random() - 0.5;
                        });
                        //Obtenemos 15 jugadores
                        this.obtenerJugadoresParaEquipoUser();
                        //Ponemos 5 titulares aleatorios
                        this.jugadoresParaMiEquipo.forEach((element: any) => {
                          //Si no hay ningun titular en esta posicion
                          if (this.map.get(element.posicion) === false) {
                            this.jugador = {
                              idEquipoUser: res2.equipoUser.id,
                              idJugadorReal: element.id,
                              idLiga: res2.equipoUser.idLiga,
                              titular: true,
                            };
                            this.map.set(element.posicion, true);
                            //Si la posicion es AL, ya hay un titular en esta posicion y no hay ningun titular en AL2
                          } else if (
                            element.posicion === 'AL' &&
                            this.map.get(element.posicion) === true &&
                            this.map.get('AL2') === false
                          ) {
                            this.jugador = {
                              idEquipoUser: res2.equipoUser.id,
                              idJugadorReal: element.id,
                              idLiga: res2.equipoUser.idLiga,
                              titular: true,
                            };
                            this.map.set('AL2', true);
                            //Si ya hay titular en esta posicion
                          } else {
                            this.jugador = {
                              idEquipoUser: res2.equipoUser.id,
                              idJugadorReal: element.id,
                              idLiga: res2.equipoUser.idLiga,
                              titular: false,
                            };
                          }

                          //Creamos jugadorRealEnCadaLiga para guardar ese jugador en el equipo que se acaba de crear
                          this.jugadoresService
                            .crearEquipoUser(this.jugador)
                            .subscribe((res4) => {
                              if (res4.status === 'exito') {
                                this.jugadores++;
                                if (this.jugadores === 15) {
                                  this.equipoUserLogueado = res2.equipoUser;
                                  // Cuando tengamos los 15 jugadores, vamos a la pantalla de inicio
                                  this.localStorage.setEquipoUser(
                                    this.equipoUserLogueado
                                  );
                                  this.navigate('/inicio');
                                  this.openSnackBar(
                                    '¡Bienvenido a tu nueva liga!'
                                  );
                                }
                              }
                            });
                        });

                        //Saco de los jugadores libres, aquellos que no estén en mi equipo
                        this.jugadoresLibres.forEach((element: any) => {
                          this.posibleMercado = 0;
                          this.jugadoresParaMiEquipo.forEach((jugador: any) => {
                            if (element.id === jugador.id)
                              this.posibleMercado++;
                          });
                          if (
                            this.posibleMercado === 0 &&
                            this.jugadoresMercado < 14
                          ) {
                            console.log('jugMercado:' + this.jugadoresMercado);

                            this.jugadorAMercado = {
                              idLiga: this.equipoUser.idLiga,
                              idJugadorReal: element.id,
                              mercado: true,
                              titular: false,
                            };
                            if (this.jugadorAMercado != null)
                              this.jugadoresMercado++;

                            //Pongo jugadores al mercado hasta que llegue al límite: 14
                            this.jugadoresService
                              .ponerJugadorLibreEnMercado(this.jugadorAMercado)
                              .subscribe((res5) => {
                                if (res5.status === 'exito') console.log(res5);
                              });
                          }
                        });
                      });
                  }
                });
            }
          });
        }
      });
    }
  }

  //Comprueba si el nombre de liga introducido ya está registrado
  comprobarNombreLiga(formGroup: FormGroup) {
    const { nombreLiga } = formGroup.controls;

    this.ligaService
      .comprobarExisteNombreLiga(nombreLiga.value)
      .subscribe((res) => {
        if (res.status === 'existe')
          return nombreLiga.setErrors({ existeLiga: true });
      });
  }

  //Comprueba si el nombre de equipo introducido ya está registrado
  comprobarNombreEquipo(formGroup: FormGroup) {
    const { nombreEquipo } = formGroup.controls;
    this.equiposService
      .comprobarExisteNombreEquipo(nombreEquipo.value)
      .subscribe((res) => {
        if (res.status === 'existe')
          return nombreEquipo.setErrors({ existeEquipo: true });
      });
  }

  //Muestra un mensaje
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5 * 1000,
    });
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }

  //Obtenemos 15 jugadores: 3 de casa posicion y 6 'alas'
  obtenerJugadoresParaEquipoUser() {
    let porteros = 0; //3
    let cierres = 0; //3
    let alas = 0; //6
    let pivots = 0; //3 Total: 15jug
    this.jugadoresParaMiEquipo = [];

    this.jugadoresLibres.forEach((jugador: any) => {
      switch (jugador.posicion) {
        case 'PT': {
          if (porteros < 3) {
            this.jugadoresParaMiEquipo.push(jugador);
            porteros++;
          }
          break;
        }
        case 'CI': {
          if (cierres < 3) {
            this.jugadoresParaMiEquipo.push(jugador);
            cierres++;
          }
          break;
        }
        case 'AL': {
          if (alas < 6) {
            this.jugadoresParaMiEquipo.push(jugador);
            alas++;
          }
          break;
        }
        case 'PV': {
          if (pivots < 3) {
            this.jugadoresParaMiEquipo.push(jugador);
            pivots++;
          }
          break;
        }
      }
    });
  }
}
