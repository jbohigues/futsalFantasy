import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalConfLigaComponent } from './componentes/principal-conf-liga/principal-conf-liga.component';
import { FormConfLigaComponent } from './componentes/form-conf-liga/form-conf-liga.component';



@NgModule({
  declarations: [
    PrincipalConfLigaComponent,
    FormConfLigaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConfiguracionLigaModule { }
