import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InicioModule } from './inicio/inicio.module';
import { ClasificacionModule } from './clasificacion/clasificacion.module';
import { AlineacionModule } from './alineacion/alineacion.module';
import { MercadoModule } from './mercado/mercado.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    InicioModule,
    ClasificacionModule,
    AlineacionModule,
    MercadoModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
