import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/global/servicios/local-storage.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-form-iniciar-sesion',
  templateUrl: './form-iniciar-sesion.component.html',
  styleUrls: ['./form-iniciar-sesion.component.scss']
})
export class FormIniciarSesionComponent implements OnInit {
  hide = true;
  usuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private localstorage: LocalStorageService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.usuarioForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  //Comprueba que existe ese usuario con esa contraseña
  login(usuarioForm: FormGroup) {
    const { usuario, password } = usuarioForm.value;
    
    if (usuario === "" && password === "")
      this.openSnackBar("Debe rellenar los campos.");
    else {
      this.usuariosService.getUsuario(usuario, password).subscribe((res) => {
        
        //Si no devuelve ningun usuario => muestra mensaje de usuario o contraseña incorrectos
        if (res === null)
          this.openSnackBar("Usuario o contraseña incorrectos.");
        else {
          this.localstorage.setSession(res);
          this.openSnackBar("Usuario logueado con éxito.");
          this.router.navigate(["/inicio"]);
        }
      });
    }
  }

  //Muestra un mensaje
  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5*1000
    });
  }

}
