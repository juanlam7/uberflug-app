import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authService.login(email ?? '', password ?? '');
      if (user) {
        localStorage.setItem('Token', 'yet8retj')
        this.router.navigate(['/auth'])
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onGoogleLogin() {
    try {
      const user = await this.authService.loginGoogle();
      if (user) {
        localStorage.setItem('Token', 'yet8retj')
        console.log('Funcionó Google!');
        this.router.navigate(['/auth'])
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onFacebookLogin() {
    try {
      const user = await this.authService.loginFacebook();
      if (user) {
        localStorage.setItem('Token', 'yet8retj')
        console.log('Funcionó Facebook!');
        this.router.navigate(['/auth'])
      }
    } catch (error) {
      console.log(error);
    }
  }
}
