import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalAlineacionComponent } from './alineacion/componentes/principal-alineacion/principal-alineacion.component';
import { PrincipalClasificacionComponent } from './clasificacion/componentes/principal-clasificacion/principal-clasificacion.component';
import { PrincipalComponent } from './home/componentes/principal/principal.component';
import { NoticiarioComponent } from './inicio/componentes/noticiario/noticiario.component';
import { PrincipalJornadaComponent } from './jornada/componentes/principal-jornada/principal-jornada.component';
import { PrincipalLigaComponent } from './liga/componentes/principal-liga/principal-liga.component';
import { PrincipalCrearLigaComponent } from './liga/creacionLiga/componentes/principal-crear-liga/principal-crear-liga.component';
import { PrincipalUnirseLigaComponent } from './liga/unionLiga/componentes/principal-unirse-liga/principal-unirse-liga.component';
import { PrincipalMercadoComponent } from './mercado/componentes/principal-mercado/principal-mercado.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PrincipalComponent },
  { path: 'inicio', component: NoticiarioComponent },
  { path: 'clasificacion', component: PrincipalClasificacionComponent },
  { path: 'alineacion', component: PrincipalAlineacionComponent },
  { path: 'mercado', component: PrincipalMercadoComponent },
  { path: 'jornada', component: PrincipalJornadaComponent },
  { path: 'liga', component: PrincipalLigaComponent },
  { path: 'liga/crearLiga', component: PrincipalCrearLigaComponent },
  { path: 'liga/unirseLiga', component: PrincipalUnirseLigaComponent },
  // {path: 'perfil'},
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page https://angular.io/guide/router
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
