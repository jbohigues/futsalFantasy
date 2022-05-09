import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalAlineacionComponent } from './componentes/principal-alineacion/principal-alineacion.component';
import { GlobalModule } from '../global/global.module';
import { CuadroAlineacionComponent } from './componentes/cuadro-alineacion/cuadro-alineacion.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { PlantillaComponent } from './componentes/plantilla/plantilla.component';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PrincipalAlineacionComponent,
    CuadroAlineacionComponent,
    PlantillaComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
  ],
})
export class AlineacionModule {}
