import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { allCharactersResponse, Character } from '../types/characters';

const BASE_API = 'https://gateway.marvel.com/v1/public/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  http = inject(HttpClient);

  // TODO: add pagination to avoid big load of data who slow down the app performance
  getAllCharacters(): Observable<Character[]> {
    const endpoint = `${BASE_API}?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=12`;
    return this.http.get<allCharactersResponse>(endpoint).pipe(retry(1),
      map((p) => (p.data.results))
      , catchError(this.handleError));
  }

  getDetailCharacter(id: any): Observable<Character[]> {
    const endpoint = `${BASE_API}/${id}?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=12`;
    return this.http.get<allCharactersResponse>(endpoint).pipe(retry(1),
      map((p) => (p.data.results))
      , catchError(this.handleError));
  }

  getComictsByCharacter(url: string): Observable<any> {
    const endpoint = `https${url}?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=12`;
    return this.http.get<any>(endpoint).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}