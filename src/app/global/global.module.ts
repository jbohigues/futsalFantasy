import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from './componentes/loading/loading.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent],
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
  exports: [HeaderComponent, FooterComponent, LoadingComponent],
})
export class GlobalModule {}
