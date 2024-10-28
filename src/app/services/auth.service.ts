import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs';

interface ILogin {
  value: string;
  refreshToken: string;
}

interface TokenRefreshResponse {
  login: ILogin;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);

  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';

  login(username: string, password: string) {
    return this.apollo
      .mutate<TokenRefreshResponse>({
        mutation: gql`
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              value
              refreshToken
            }
          }
        `,
        variables: {
          username,
          password,
        },
      })
      .pipe(
        tap(res => {
          if (res.data?.login) {
            this.setToken(res.data?.login.value);
            this.setRefreshToken(res.data?.login.refreshToken);
            this.autoRefreshToken();
          }
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.refreshTokenKey);
    } else {
      return null;
    }
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.apollo
      .mutate<TokenRefreshResponse>({
        mutation: gql`
          mutation Mutation($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              value
              refreshToken
            }
          }
        `,
        variables: {
          refreshToken,
        },
      })
      .pipe(
        tap(res => {
          if (res.data?.login) {
            this.setToken(res.data?.login.value);
            this.setRefreshToken(res.data?.login.refreshToken);
            this.autoRefreshToken();
          }
        })
      );
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    const timeout = exp - Date.now() - 60 * 1000;

    setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }
}
