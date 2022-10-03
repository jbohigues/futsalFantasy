import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  hide = true;
  registroForm!: FormGroup;

  constructor(
    private router: Router,
    private localstorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar
  ) {
    this.registroForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        apellidos: [''],
        usuario: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: [this.comprobarPassword] }
    );
  }

  ngOnInit(): void {}

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

  //Comprueba si el email introducido ya está registrado
  // comprobarEmail(formGroup: FormGroup) {
  //   const { email } = formGroup.controls;
  //   this.usuariosService
  //     .getUsuarioConEmail(email.value)
  //     .subscribe((res: any) => {
  //       if (res.existeEmail) return email.setErrors({ existeEmail: true });
  //     });
  // }

  //Crea un usuario en la tabla usuarios
  registrar(formGroup: FormGroup) {
    const { nombre, apellidos, usuario, email, password } =
      this.registroForm.value;
    if (nombre === '' || usuario === '' || email === '' || password === '')
      this.openSnackBar('Debe rellenar los campos obligatorios.');
    else {
      this.usuariosService
        .registrarUsuario(nombre, apellidos, usuario, email, password)
        .subscribe((res) => {
          if (res.status == 'Usuario registrado con éxito.') {
            this.localstorage.setSession(res.usuario);
            this.router.navigate(['/liga']);
            this.openSnackBar(res.status);
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
}
