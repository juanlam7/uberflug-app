import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'heros-List', pathMatch: 'full' },
    { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent) 
    },
    { 
        path: 'heros-List', 
        loadComponent: () => import('./pages/heros-list/heros-list.component').then(c => c.HerosListComponent) 
    },
    { 
        path: 'detail-hero/:id', 
        loadComponent: () => import('./pages/detail-hero/detail-hero.component').then(c => c.DetailHeroComponent) 
    },
    { path: '**', redirectTo: 'heros-List' }
];
