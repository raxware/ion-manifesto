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
    path: 'menu',
    loadComponent: () => import('./pages/private/buttons/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'card-front',
    loadComponent: () => import('./pages/private/shared/components/card-front/card-front.page').then( m => m.CardFrontPage)
  },
  {
    path: 'card-back',
    loadComponent: () => import('./pages/private/shared/components/card-back/card-back.page').then( m => m.CardBackPage)
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/private/buttons/info/info.page').then( m => m.InfoPage)
  },
  {
    path: 'help',
    loadComponent: () => import('./pages/private/buttons/help/help.page').then( m => m.HelpPage)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/private/buttons/feedback/feedback.page').then( m => m.FeedbackPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/private/buttons/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'share',
    loadComponent: () => import('./pages/private/buttons/share/share.page').then( m => m.SharePage)
  },
  {
    path: 'logout',
    loadComponent: () => import('./pages/private/buttons/logout/logout.page').then( m => m.LogoutPage)
  },
  {
    path: 'proto-card',
    loadComponent: () => import('./pages/private/shared/proto-card/proto-card.page').then( m => m.ProtoCardPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  */
];
