import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';
import { HerosListComponent } from './pages/heros-list/heros-list.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'heros-List', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'heros-List', component: HerosListComponent },
  { path: 'detail-hero/:id', component: DetailHeroComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
