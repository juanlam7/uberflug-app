import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
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
