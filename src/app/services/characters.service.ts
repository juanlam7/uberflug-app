import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(public http: HttpClient) { }

  getAllCharacters() : Observable<any> {
    const endpoint = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=100`;
    return this.http.get<any>(endpoint);
  }

  getDetailCharacter(id: any) : Observable<any> {
    const endpoint = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=100`;
    return this.http.get<any>(endpoint);
  }

  getComictsByCharacter(url: string) : Observable<any> {
    const endpoint = `${url}?ts=1&apikey=e5dc9090bc2546ae10b3abe84382751c&hash=05a1400f79b7e0a15a8ea3d74e8d1f1a&limit=100`;
    return this.http.get<any>(endpoint);
  }
}
