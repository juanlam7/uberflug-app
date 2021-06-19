import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    
    this.authService.login(email, password);
  }

  async onGoogleLogin() {
    try {
      const user = await this.authService.loginGoogle();
      if (user) {
        console.log('Funcionó Google!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onFacebookLogin() {
    try {
      const user = await this.authService.loginFacebook();
      if (user) {
        console.log('Funcionó Facebook!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
