import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { InputFieldComponent } from './components/input.component';

@Component({
  selector: 'login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    InputFieldComponent,
  ],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  loginForm!: FormGroup;
  emailControl!: FormControl;
  passwordlControl!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.emailControl = this.loginForm.get('email') as FormControl;
    this.passwordlControl = this.loginForm.get('password') as FormControl;
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    console.log('Email and password', email, password);
  }
}
