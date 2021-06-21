import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule  } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { CardComponent } from './card/card.component';
import { MenuModalComponent } from './top-toolbar/menu-modal/menu-modal.component';

@NgModule({
  declarations: [
    TopToolbarComponent,
    CardComponent,
    MenuModalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    TopToolbarComponent,
    CardComponent,
    MenuModalComponent
  ]
})
export class ComponentsModule { }
