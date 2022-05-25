import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPerfilComponent } from './componentes/principal-perfil/principal-perfil.component';
import { GlobalModule } from '../global/global.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TabsPerfilComponent } from './componentes/tabs-perfil/tabs-perfil.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PlantillaPerfilComponent } from './componentes/plantilla-perfil/plantilla-perfil.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    PrincipalPerfilComponent,
    TabsPerfilComponent,
    PlantillaPerfilComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
  ],
})
export class PerfilModule {}
