import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HerosListComponent } from './pages/heros-list/heros-list.component';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'heros-List', component: HerosListComponent },
      { path: 'detail-hero/:id', component: DetailHeroComponent },
      { path: '**', redirectTo: 'heros-List' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
