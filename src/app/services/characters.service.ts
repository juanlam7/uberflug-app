import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  debounceTime,
  map,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import {
  allCharactersResponse,
  Character,
  DataResponse,
} from '../types/characters';
import { allComicResponse, Comic } from '../types/comics';

const BASE_API = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY =
  'e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  http = inject(HttpClient);

  getAllCharacters(
    limit: number,
    offset: number,
    nameStartsWith: string
  ): Observable<DataResponse> {
    const endpoint = `${BASE_API}?ts=1&apikey=${API_KEY}`;

    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    if (nameStartsWith && nameStartsWith.length > 0) {
      params = params.set('nameStartsWith', nameStartsWith);
    }

    return this.http.get<allCharactersResponse>(endpoint, { params }).pipe(
      debounceTime(300),
      retry(1),
      map(p => p.data),
      catchError(this.handleError)
    );
  }

  getDetailCharacter(id: any): Observable<Character[]> {
    const endpoint = `${BASE_API}/${id}?ts=1&apikey=${API_KEY}`;
    return this.http.get<allCharactersResponse>(endpoint).pipe(
      retry(1),
      map(p => p.data.results),
      catchError(this.handleError)
    );
  }

  getComicsByCharacter(characterId: number): Observable<Comic[]> {
    const endpoint = `${BASE_API}/${characterId}/comics?ts=1&apikey=${API_KEY}&limit=12`;
    return this.http.get<allComicResponse>(endpoint).pipe(
      retry(1),
      map(p => p.data.results),
      catchError(this.handleError)
    );
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
