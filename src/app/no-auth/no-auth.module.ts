import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoAuthRoutingModule } from './no-auth-routing.module';
import { ComponentsModule } from '../components/components.module';

import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoAuthRoutingModule,
    ComponentsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class NoAuthModule { }
