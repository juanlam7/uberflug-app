import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'heros-list', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'heros-list',
    loadComponent: () =>
      import('./pages/heros-list/heros-list.component').then(
        c => c.HerosListComponent
      ),
  },
  {
    path: 'detail-hero/:id',
    loadComponent: () =>
      import('./pages/detail-hero/detail-hero.component').then(
        c => c.DetailHeroComponent
      ),
  },
  {
    path: 'favorites-list',
    loadComponent: () =>
      import('./pages/heros-list-fav/heros-list-fav.component').then(
        c => c.HerosListFavComponent
      ),
  },
  { path: '**', redirectTo: 'heros-list' },
];
