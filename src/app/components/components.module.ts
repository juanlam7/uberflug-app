import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';
import { MenuModalComponent } from './top-toolbar/menu-modal/menu-modal.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
  declarations: [
    TopToolbarComponent,
    CardComponent,
    MenuModalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    TopToolbarComponent,
    CardComponent,
    MenuModalComponent
  ]
})
export class ComponentsModule { }
