import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    TopToolbarComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopToolbarComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
