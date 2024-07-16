import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DetailsPage } from "./details.page";

const routes: Routes = [
  {
    path: "",
    component: DetailsPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsPageRoutingModule {}

/*

   {
    path: 'details/:id',
    loadChildren: () => import('./shared/details/details.routes').then(m => m.DetailsPageRoutingModule)
  },

const routes: Routes = [
  {
    path: "",
    component: DetailsPage
  },
  {
    path: 'collections',
    loadComponent: () => import('../../pages/private/containers/collections/collections.page').then( m => m.CollectionsPage)
  },
  {
    path: 'boxes',
    loadComponent: () => import('../../pages/private/containers/boxes/boxes.page').then( m => m.BoxesPage)
  },
  {
    path: 'lists',
    loadComponent: () => import('../../pages/private/containers/lists/lists.page').then( m => m.ListsPage)
  },
  {
    path: 'people',
    loadComponent: () => import('../../pages/private/containers/people/people.page').then( m => m.PeoplePage)
  },
  {
    path: 'locate',
    loadComponent: () => import('../../pages/private/containers/locate/locate.page').then( m => m.LocatePage)
  },
];

 */