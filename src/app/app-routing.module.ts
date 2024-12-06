import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { ProfileAuthenticationPageComponent } from './components/pages/profile-authentication-page/profile-authentication-page.component';
import { ServicesListComponent } from './components/pages/services-list/services-list.component';
import { FormularioEditComponent } from './components/pages/formulario-edit/formulario-edit.component';
import { authGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: ProfileAuthenticationPageComponent},
  {path: 'admin', component: ServicesListComponent,canActivate: [authGuard]},
  {path: 'formulario/:id', component: FormularioEditComponent,canActivate: [authGuard]},
  {path: 'formulario', component: FormularioEditComponent,canActivate: [authGuard]},

  {path: '**', component: NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
