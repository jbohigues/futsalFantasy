import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { GlobalModule } from '../global/global.module';
import { CardComponent } from './componentes/card/card.component';
import { CardsComponent } from './componentes/cards/cards.component';
import { CuadroLoginComponent } from './componentes/cuadro-login/cuadro-login.component';
import { TabsComponent } from './componentes/tabs/tabs.component';
import { FormIniciarSesionComponent } from './componentes/form-iniciar-sesion/form-iniciar-sesion.component';
import { FormRegistroComponent } from './componentes/form-registro/form-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular material
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PrincipalComponent,
    CardComponent,
    CardsComponent,
    CuadroLoginComponent,
    TabsComponent,
    FormIniciarSesionComponent,
    FormRegistroComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ], 
  exports: [
    PrincipalComponent
  ]
})
export class HomeModule { }
