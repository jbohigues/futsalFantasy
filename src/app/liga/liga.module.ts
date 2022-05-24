import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalLigaComponent } from './componentes/principal-liga/principal-liga.component';
import { GlobalModule } from '../global/global.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PrincipalCrearLigaComponent } from './creacionLiga/componentes/principal-crear-liga/principal-crear-liga.component';
import { PrincipalUnirseLigaComponent } from './unionLiga/componentes/principal-unirse-liga/principal-unirse-liga.component';
import { FormCrearLigaComponent } from './creacionLiga/componentes/form-crear-liga/form-crear-liga.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormUnirseLigaComponent } from './unionLiga/componentes/form-unirse-liga/form-unirse-liga.component';
import { InfoLigaComponent } from './unionLiga/componentes/info-liga/info-liga.component';

@NgModule({
  declarations: [
    PrincipalLigaComponent,
    PrincipalCrearLigaComponent,
    PrincipalUnirseLigaComponent,
    FormCrearLigaComponent,
    FormUnirseLigaComponent,
    InfoLigaComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class LigaModule {}
