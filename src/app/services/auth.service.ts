import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  async login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }

  async loginGoogle(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }

  async loginFacebook(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }

  async logout(): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }
}
