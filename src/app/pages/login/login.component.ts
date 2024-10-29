import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  userNameControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.userNameControl = this.loginForm.get('userName') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
  }

  async onLogin() {
    const { userName, password } = this.loginForm.value;
    this.authService.login(userName, password).subscribe(res => {
      this.router.navigate(['/heros-list']);
    });
  }
}
