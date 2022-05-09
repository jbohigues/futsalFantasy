import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuadroClasificacionComponent } from './componentes/cuadro-clasificacion/cuadro-clasificacion.component';
import { GlobalModule } from '../global/global.module';
import { MatTableModule } from '@angular/material/table';
import { CuadroLigaComponent } from './componentes/cuadro-liga/cuadro-liga.component';
import { PrincipalClasificacionComponent } from './componentes/principal-clasificacion/principal-clasificacion.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    CuadroClasificacionComponent,
    CuadroLigaComponent,
    PrincipalClasificacionComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatTableModule,
    MatSortModule
  ]
})
export class ClasificacionModule { }
