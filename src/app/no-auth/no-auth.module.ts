import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoAuthRoutingModule } from './no-auth-routing.module';

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
    NoAuthRoutingModule
  ]
})
export class NoAuthModule { }