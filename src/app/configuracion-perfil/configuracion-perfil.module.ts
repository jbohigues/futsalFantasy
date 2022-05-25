import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalConfPerfilComponent } from './componentes/principal-conf-perfil/principal-conf-perfil.component';
import { GlobalModule } from '../global/global.module';
import { FormConfPerfilComponent } from './componentes/form-conf-perfil/form-conf-perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DialogPerfilComponent } from './componentes/dialog-perfil/dialog-perfil.component';
import { LogoEquipoUserComponent } from './componentes/logo-equipo-user/logo-equipo-user.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PrincipalConfPerfilComponent,
    FormConfPerfilComponent,
    DialogPerfilComponent,
    LogoEquipoUserComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class ConfiguracionPerfilModule {}
