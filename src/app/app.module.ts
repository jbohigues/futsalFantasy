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
import { JornadaModule } from './jornada/jornada.module';
import { LigaModule } from './liga/liga.module';
import { PerfilModule } from './perfil/perfil.module';
import { ConfiguracionPerfilModule } from './configuracion-perfil/configuracion-perfil.module';
import { ConfiguracionLigaModule } from './configuracion-liga/configuracion-liga.module';

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
    JornadaModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LigaModule,
    PerfilModule,
    ConfiguracionPerfilModule,
    ConfiguracionLigaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
