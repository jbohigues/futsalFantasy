import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalAlineacionComponent } from './alineacion/componentes/principal-alineacion/principal-alineacion.component';
import { PrincipalClasificacionComponent } from './clasificacion/componentes/principal-clasificacion/principal-clasificacion.component';
import { PrincipalConfLigaComponent } from './configuracion-liga/componentes/principal-conf-liga/principal-conf-liga.component';
import { PrincipalConfPerfilComponent } from './configuracion-perfil/componentes/principal-conf-perfil/principal-conf-perfil.component';
import { LoginGuard } from './guards/login.guard';
import { UserLiderGuard } from './guards/user-lider.guard';
import { PrincipalComponent } from './home/componentes/principal/principal.component';
import { NoticiarioComponent } from './inicio/componentes/noticiario/noticiario.component';
import { PrincipalJornadaComponent } from './jornada/componentes/principal-jornada/principal-jornada.component';
import { PrincipalLigaComponent } from './liga/componentes/principal-liga/principal-liga.component';
import { PrincipalCrearLigaComponent } from './liga/creacionLiga/componentes/principal-crear-liga/principal-crear-liga.component';
import { PrincipalUnirseLigaComponent } from './liga/unionLiga/componentes/principal-unirse-liga/principal-unirse-liga.component';
import { PrincipalMercadoComponent } from './mercado/componentes/principal-mercado/principal-mercado.component';
import { PrincipalPerfilComponent } from './perfil/componentes/principal-perfil/principal-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PrincipalComponent },
  { path: 'inicio', component: NoticiarioComponent, canActivate: [LoginGuard] },
  {
    path: 'clasificacion',
    component: PrincipalClasificacionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'alineacion',
    component: PrincipalAlineacionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'mercado',
    component: PrincipalMercadoComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'jornada',
    component: PrincipalJornadaComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'liga',
    component: PrincipalLigaComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'liga/crearLiga',
    component: PrincipalCrearLigaComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'liga/unirseLiga',
    component: PrincipalUnirseLigaComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil',
    component: PrincipalPerfilComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil/configuracion',
    component: PrincipalConfPerfilComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil/configuracionLiga',
    component: PrincipalConfLigaComponent,
    canActivate: [LoginGuard, UserLiderGuard],
  },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page https://angular.io/guide/router
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
