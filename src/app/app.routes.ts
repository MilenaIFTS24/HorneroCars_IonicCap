import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [

   {
    path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }, 

  {
    path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage), //canActivate: [authGuard],
    children: [ // Los hijos de 'home' se cargan dentro de HomePage
      {
        path: '',
        redirectTo: 'perfil', // Redirige a 'perfil' si solo se accede a /home
        pathMatch: 'full'
      },
      {
        path: 'reservar', loadComponent: () => import('./pages/reservar/reservar.page').then(m => m.ReservarPage),//canActivate: [authGuard], 
      },
      {
        path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage), //canActivate: [authGuard],
      },
      {
        path: 'mis-reservas',
        loadComponent: () => import('./pages/mis-reservas/mis-reservas.page').then(m => m.MisReservasPage), //canActivate: [authGuard],

      },

    ]
  },
  {

    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

];
