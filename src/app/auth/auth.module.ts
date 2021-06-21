import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule } from '../components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { HerosListComponent } from './pages/heros-list/heros-list.component';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';
import { ModalComponent } from './pages/detail-hero/modal/modal.component';


@NgModule({
  declarations: [
    HerosListComponent,
    DetailHeroComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AuthRoutingModule,
    NgxPaginationModule,
    CarouselModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthModule { }
