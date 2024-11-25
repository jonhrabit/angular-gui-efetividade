import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegistrosComponent } from './registros/registros/registros.component';
import { ListaDiaComponent } from './registros/lista-dia/lista-dia.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'registros',
    component: RegistrosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registros/dia/:dia/:mes/:ano',
    component: ListaDiaComponent,
    canActivate: [authGuard],
  },
];
