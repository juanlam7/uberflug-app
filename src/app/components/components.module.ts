import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule  } from '@angular/router';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    TopToolbarComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    TopToolbarComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
