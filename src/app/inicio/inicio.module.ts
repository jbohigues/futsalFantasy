import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiarioComponent } from './componentes/noticiario/noticiario.component';
import { GlobalModule } from '../global/global.module';
import { NoticiaComponent } from './componentes/noticia/noticia.component';
import { InfoEquipoUserComponent } from './componentes/info-equipo-user/info-equipo-user.component';
import { ProxJornadaComponent } from './componentes/prox-jornada/prox-jornada.component';
import { MiClasificacionComponent } from './componentes/mi-clasificacion/mi-clasificacion.component';

//Angular material
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    NoticiarioComponent,
    NoticiaComponent,
    InfoEquipoUserComponent,
    ProxJornadaComponent,
    MiClasificacionComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatTableModule
  ]
})
export class InicioModule { }
