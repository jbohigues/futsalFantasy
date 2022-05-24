import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { JugadoresRealesService } from 'src/app/global/servicios/jugadores-reales.service';
import { LigaUserService } from 'src/app/global/servicios/liga-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { EquipoUser, EquipoUserCreate } from 'src/app/interfaces/equipo-user';
import { JugadorReal } from 'src/app/interfaces/jugador-real';
import {
  JugadorRealEnCadaLiga,
  JugadorRealEnCadaLigaCreate,
} from 'src/app/interfaces/jugador-real-en-cada-liga';
import { Liga } from 'src/app/interfaces/liga';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-form-unirse-liga',
  templateUrl: './form-unirse-liga.component.html',
  styleUrls: ['./form-unirse-liga.component.scss'],
})
export class FormUnirseLigaComponent implements OnInit {
  unirseLigaForm!: FormGroup;
  nombreEquipoForm!: FormGroup;
  liga!: Liga;
  hayLiga: boolean = false;
  equipoUser!: EquipoUserCreate;
  userLogueado!: Usuario;
  jugadoresOcupados: JugadorRealEnCadaLiga[] = [];
  jugadoresLibres: JugadorReal[] = [];
  arrayAux: JugadorReal[] = [];
  jugadoresParaMiEquipo: any[] = [];
  jugador!: JugadorRealEnCadaLigaCreate;
  jugadores: number = 0;
  equipoUserLogueado!: EquipoUser;
  map: Map<string, boolean> = new Map();
  jugadorOcupado: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ligaService: LigaUserService,
    private equiposService: EquiposUserService,
    private _snackBar: MatSnackBar,
    private localStorage: LocalStorageService,
    private jugadoresService: JugadoresRealesService
  ) {
    this.unirseLigaForm = this.formBuilder.group({
      codigoLiga: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.nombreEquipoForm = this.formBuilder.group({
      nombreEquipo: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    //Inicializamos map
    this.map.set('PT', false);
    this.map.set('CI', false);
    this.map.set('AL', false);
    this.map.set('AL2', false);
    this.map.set('PV', false);
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }

  comprobarCodigoLiga(formGroup: FormGroup) {
    const { codigoLiga } = formGroup.controls;
    this.ligaService
      .comprobarExisteCodigoLiga(codigoLiga.value)
      .subscribe((res) => {
        console.log(res);

        if (res.status === 'noExiste') {
          this.hayLiga = false;
          return codigoLiga.setErrors({ noExiste: true });
        } else {
          this.liga = res.ligaUser;
          this.hayLiga = true;
          console.log(this.liga);
        }
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

  unirseALiga(nombreEquipoForm: FormGroup) {
    const nombreEquipo = nombreEquipoForm.value;
    console.log(nombreEquipo);

    if (nombreEquipo === '') this.openSnackBar('Debe rellenar el campo.');
    else {
      //CREAMOS EL EQUIPO
      //Inicializamos nuevo equipo
      this.equipoUser = {
        idLiga: this.liga.id,
        idUsuario: this.userLogueado.id,
        nombre: nombreEquipo.nombreEquipo,
      };
      //Creamos nuevo equipo
      this.equiposService.crearEquipoUser(this.equipoUser).subscribe((res2) => {
        if (res2.status === 'exito') {
          this.jugadoresService.obtenerJugadoresReales().subscribe((res3) => {
            //Obtenemos todos los jugadores reales y los ordenamos aleatoriamente
            this.arrayAux = res3.jugadores;
            this.jugadoresLibres.sort(function () {
              return Math.random() - 0.5;
            });
            //Obtenemos los jugadores que ya tienen equipo o están en el mercado de esta liga
            this.jugadoresService
              .obtenerJugadoresRealesDeCiertaLiga(this.liga.id)
              .subscribe((res4) => {
                this.jugadoresOcupados = res4.jugadores;
                //Obtenemos array con todos los jugadores que hay libres en esa liga
                this.quitarJugadoresOcupados();
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
                          this.openSnackBar('¡Bienvenido a tu nueva liga!');
                        }
                      }
                    });
                });
              });
          });
        }
      });
    }
  }

  quitarJugadoresOcupados() {
    this.arrayAux.forEach((libre) => {
      this.jugadorOcupado = false;
      for (
        let i = 0;
        i < this.jugadoresOcupados.length && !this.jugadorOcupado;
        i++
      ) {
        if (libre.id === this.jugadoresOcupados[i].idJugadorReal) {
          this.jugadorOcupado = true;
          console.log('iguales');
        }
      }
      if (!this.jugadorOcupado) this.jugadoresLibres.push(libre);
    });
  }

  //Obtenemos 15 jugadores: 3 de casa posicion y 6 'alas'
  obtenerJugadoresParaEquipoUser() {
    let porteros = 0; //3
    let cierres = 0; //3
    let alas = 0; //6
    let pivots = 0; //3 Total: 15jug
    let seguimos = true;
    this.jugadoresParaMiEquipo = [];

    for (let i = 0; i < this.jugadoresLibres.length && seguimos; i++) {
      console.log(this.jugadoresLibres[i]);

      if (porteros === 3 && cierres === 3 && alas === 6 && pivots === 3)
        seguimos = false;
      switch (this.jugadoresLibres[i].posicion) {
        case 'PT': {
          if (porteros < 3) {
            this.jugadoresParaMiEquipo.push(this.jugadoresLibres[i]);
            porteros++;
            console.log(porteros);
          }
          break;
        }
        case 'CI': {
          if (cierres < 3) {
            this.jugadoresParaMiEquipo.push(this.jugadoresLibres[i]);
            cierres++;
          }
          break;
        }
        case 'AL': {
          if (alas < 6) {
            this.jugadoresParaMiEquipo.push(this.jugadoresLibres[i]);
            alas++;
          }
          break;
        }
        case 'PV': {
          if (pivots < 3) {
            this.jugadoresParaMiEquipo.push(this.jugadoresLibres[i]);
            pivots++;
          }
          break;
        }
      }
    }
  }
}
