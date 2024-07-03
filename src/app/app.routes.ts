import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/private/tabs/tabs.routes').then((m) => m.routes),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  /*
  {
    path: 'proto-card',
    loadComponent: () => import('./shared/components/proto-card/proto-card.page').then( m => m.ProtoCardPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  */
];
