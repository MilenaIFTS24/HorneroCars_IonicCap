import { Routes } from '@angular/router';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },   {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'reservar',
    loadComponent: () => import('./pages/reservar/reservar.page').then( m => m.ReservarPage), //canActivate: [authGuard],
  },
  {
    path: 'mis-reservas',
    loadComponent: () => import('./pages/mis-reservas/mis-reservas.page').then( m => m.MisReservasPage), //canActivate: [authGuard],
  },

 
];
