import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoAuthRoutingModule } from './no-auth-routing.module';
import { ComponentsModule } from '../components/components.module';

import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoAuthRoutingModule,
    ComponentsModule
  ]
})
export class NoAuthModule { }
