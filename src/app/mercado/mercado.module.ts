import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalMercadoComponent } from './componentes/principal-mercado/principal-mercado.component';
import { TabsComponent } from './componentes/tabs/tabs.component';
import { GlobalModule } from '../global/global.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TablaFichajesComponent } from './componentes/tabla-fichajes/tabla-fichajes.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './componentes/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';

@NgModule({
  declarations: [
    PrincipalMercadoComponent,
    TabsComponent,
    TablaFichajesComponent,
    DialogComponent,
    VentasComponent,
    OfertasComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class MercadoModule {}
