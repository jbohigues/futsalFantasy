import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EquiposUserService } from 'src/app/global/servicios/equipos-user.service';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { UsuariosService } from 'src/app/home/servicios/usuarios.service';
import { EquipoUser } from 'src/app/interfaces/equipo-user';
import { Usuario } from 'src/app/interfaces/usuario';
import { Md5 } from 'ts-md5';
import { DialogPerfilComponent } from '../dialog-perfil/dialog-perfil.component';

@Component({
  selector: 'app-form-conf-perfil',
  templateUrl: './form-conf-perfil.component.html',
  styleUrls: ['./form-conf-perfil.component.scss'],
})
export class FormConfPerfilComponent implements OnInit {
  hide = true;
  loading: boolean = false;
  hayCambios: boolean = false;
  confPerfilForm!: FormGroup;
  userLogueado!: Usuario;
  equipoUser!: EquipoUser;
  mensaje: string = 'Actualizar contraseña';

  logoEquipo: string = 'http://localhost:3000/images/logosEquiposUsers/';

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private equiposService: EquiposUserService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.confPerfilForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        nombreEquipo: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        apellidos: [''],
        usuario: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        password2: ['', [Validators.minLength(6)]],
      },
      { validators: [this.comprobarPassword] }
    );
  }

  ngOnInit(): void {
    //Obtengo user logueado
    this.userLogueado = this.localStorage.getUsuarioLocalStorage();
    //Obtengo su equipo
    this.equipoUser = this.localStorage.getEquipoLocalStorage();
    console.log(this.userLogueado, this.equipoUser);
  }

  //Comprueba si el nombre de usuario introducido ya está registrado
  comprobarUsuario(formGroup: FormGroup) {
    const { usuario } = formGroup.controls;
    this.usuariosService
      .getUsuarioConUsuario(usuario.value)
      .subscribe((res: any) => {
        if (res.existeUsername) {
          return usuario.setErrors({ existeUser: true });
        }
      });
  }

  //Obliga a que las dos contraseñas coincidan
  comprobarPassword(formGroup: FormGroup) {
    const { password, password2 } = formGroup.controls;
    if (password.value == password2.value) {
      return null;
    } else {
      return password2.setErrors({ notEqual: true });
    }
  }

  //Comprueba si el nombre de usuario introducido ya está registrado
  comprobarNombreEquipo(formGroup: FormGroup) {
    const { nombreEquipo } = formGroup.controls;
    this.equiposService
      .comprobarExisteNombreEquipo(nombreEquipo.value)
      .subscribe((res) => {
        if (res.equiposLiga) {
          return nombreEquipo.setErrors({ existeEquipo: true });
        }
      });
  }

  //Actualizar perfil
  actualizarPerfil() {
    const { nombre, nombreEquipo, apellidos, usuario, email, password } =
      this.confPerfilForm.value;
    if (nombre === '' || nombreEquipo === '' || usuario === '' || email === '')
      this.openSnackBar('Debe rellenar los campos obligatorios.');
    else {
      //Si hay password, la encriptamos
      if (password)
        this.userLogueado.password = Md5.hashStr(password).toString();

      //Actualizamos usuario en bd
      this.usuariosService
        .actualizarUsuario(this.userLogueado)
        .subscribe((res) => {
          console.log(res);

          if (res.status === 'update') {
            //Si éxito: lo guardamos en localStorage
            this.localStorage.setUser(this.userLogueado);
            console.log(this.equipoUser);

            //Actualizamos equipoUser en bd
            this.equiposService
              .actualizarEquipoUser(this.equipoUser)
              .subscribe((res2) => {
                console.log(res2);

                if (res2.status === 'update') {
                  //Si éxito: lo guardamos en localStorage
                  this.localStorage.setEquipoUser(this.equipoUser);
                  this.openSnackBar('Datos actualizados correctamente.');
                  this.router.navigate(['/perfil']);
                }
              });
          }
        });
    }
  }

  //Muestra un mensaje
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5 * 1000,
    });
  }

  //Mostrar campos de password
  mostrarFormPassword(texto: string) {
    if (texto === 'Ocultar') {
      document.getElementById('password')!.style.display = 'none';
      this.mensaje = 'Actualizar contraseña';
    } else {
      document.getElementById('password')!.style.display = 'block';
      this.mensaje = 'Ocultar';
    }
  }

  navigate(ruta: string) {
    this.router.navigate([ruta]);
  }

  abrirModal() {
    const dialogRef = this.dialog.open(DialogPerfilComponent, {
      panelClass: 'custom-dialog-container',
      width: '50vw',
      height: '70vh',
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data) {
        this.equipoUser.foto = data.nombre;
        this.hayCambios = true;
      }
    });
  }
}
