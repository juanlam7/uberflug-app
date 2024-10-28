import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { debounceTime, map, Observable, retry } from 'rxjs';
import {
  allCharactersResponse,
  Character,
  DataResponse,
} from '../models/characters';
import { allComicResponse, DataResponseComic } from '../models/comics';

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
      map(p => p.data)
    );
  }

  getDetailCharacter(id: any): Observable<Character[]> {
    const endpoint = `${BASE_API}/${id}?ts=1&apikey=${API_KEY}`;
    return this.http.get<allCharactersResponse>(endpoint).pipe(
      retry(1),
      map(p => p.data.results)
    );
  }

  getComicsByCharacter(
    characterId: number,
    limit: number,
    offset: number
  ): Observable<DataResponseComic> {
    const endpoint = `${BASE_API}/${characterId}/comics?ts=1&apikey=${API_KEY}`;
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get<allComicResponse>(endpoint, { params }).pipe(
      retry(1),
      map(p => p.data)
    );
  }
}
