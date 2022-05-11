import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalJornadaComponent } from './componentes/principal-jornada/principal-jornada.component';
import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [PrincipalJornadaComponent],
  imports: [CommonModule, GlobalModule],
})
export class JornadaModule {}
