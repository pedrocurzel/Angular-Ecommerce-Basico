import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'select-address',
    loadComponent: () => import('./select-address/select-address.page').then( m => m.SelectAddressPage),
    canActivate: [authGuard]
  },
  {
    path: 'finish-order',
    loadComponent: () => import('./finish-order/finish-order.page').then( m => m.FinishOrderPage),
    canActivate: [authGuard]
  },
];
