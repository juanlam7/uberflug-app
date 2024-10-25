import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'heros-list', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'heros-list',
    loadComponent: () =>
      import('./pages/heros-list/heros-list.component').then(
        c => c.HerosListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-hero/:id',
    loadComponent: () =>
      import('./pages/detail-hero/detail-hero.component').then(
        c => c.DetailHeroComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites-list',
    loadComponent: () =>
      import('./pages/heros-list-fav/heros-list-fav.component').then(
        c => c.HerosListFavComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'heros-list' },
];
