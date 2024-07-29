import { Routes } from "@angular/router";
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
    path: 'splash',
    loadComponent: () => import('./pages/public/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'collections',
    loadComponent: () => import('./pages/private/containers/collections/collections.page').then( m => m.CollectionsPage)
  },
  {
    path: 'repositories',
    loadComponent: () => import('./pages/private/containers/boxes/boxes.page').then( m => m.BoxesPage)
  },
  {
    path: 'lists',
    loadComponent: () => import('./pages/private/containers/lists/lists.page').then( m => m.ListsPage)
  },
  {
    path: 'people',
    loadComponent: () => import('./pages/private/containers/people/people.page').then( m => m.PeoplePage)
  },
  {
    path: 'places',
    loadComponent: () => import('./pages/private/containers/locate/locate.page').then( m => m.LocatePage)
  },  
  {
    path: 'search',
    loadComponent: () => import('./pages/private/containers/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'form-back',
    loadComponent: () => import('./pages/private/shared/components/form-back/form-back.page').then( m => m.FormBackPage)
  },
  {
    path: 'easter',
    loadComponent: () => import('./pages/private/shared/components/easter/easter.page').then( m => m.EasterPage)
  },
  {
    path: 'card-back',
    loadComponent: () => import('./pages/private/shared/components/card-back/card-back.page').then( m => m.CardBackPage)
  },
  {
    path: 'modal-profile',
    loadComponent: () => import('./pages/private/shared/components/modal-profile/modal-profile.page').then( m => m.ModalProfilePage)
  },
  {
    path: 'modal-push',
    loadComponent: () => import('./pages/private/shared/components/modal-push/modal-push.page').then( m => m.ModalPushPage)
  },
  /*
  {
    path: 'details/:id',
    loadChildren: () => import('./shared/details/details.routes').then(m => m.DetailsPageRoutingModule)
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/private/containers/main/main.page').then( m => m.MainPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/private/buttons/menu/menu.page').then( m => m.MenuPage)
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
    path: 'profile',
    loadComponent: () => import('./pages/private/buttons/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'proto-card',
    loadComponent: () => import('./pages/private/shared/proto-card/proto-card.page').then( m => m.ProtoCardPage),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  */
];
