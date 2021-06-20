import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule } from '../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HerosListComponent } from './pages/heros-list/heros-list.component';
import { FavHerosListComponent } from './pages/fav-heros-list/fav-heros-list.component';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';


@NgModule({
  declarations: [
    HerosListComponent,
    FavHerosListComponent,
    DetailHeroComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AuthRoutingModule,
    NgxPaginationModule,
    CarouselModule
  ]
})
export class AuthModule { }
