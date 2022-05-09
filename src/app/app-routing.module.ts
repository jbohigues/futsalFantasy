import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalAlineacionComponent } from './alineacion/componentes/principal-alineacion/principal-alineacion.component';
import { PrincipalClasificacionComponent } from './clasificacion/componentes/principal-clasificacion/principal-clasificacion.component';
import { PrincipalComponent } from './home/componentes/principal/principal.component';
import { NoticiarioComponent } from './inicio/componentes/noticiario/noticiario.component';
import { PrincipalMercadoComponent } from './mercado/componentes/principal-mercado/principal-mercado.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: PrincipalComponent},
  {path: 'inicio', component: NoticiarioComponent},
  {path: 'clasificacion', component: PrincipalClasificacionComponent},
  {path: 'alineacion', component: PrincipalAlineacionComponent},
  {path: 'mercado', component: PrincipalMercadoComponent},
  // {path: 'jornada'},
  // {path: 'perfil'},
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page https://angular.io/guide/router

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
