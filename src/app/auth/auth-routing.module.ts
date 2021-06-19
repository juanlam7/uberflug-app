import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HerosListComponent } from './pages/heros-list/heros-list.component';
import { FavHerosListComponent } from './pages/fav-heros-list/fav-heros-list.component';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'heros-List', component: HerosListComponent },
      { path: 'fav-heros-List', component: FavHerosListComponent },
      { path: 'detail-hero', component: DetailHeroComponent },
      { path: '**', redirectTo: 'heros-List' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
