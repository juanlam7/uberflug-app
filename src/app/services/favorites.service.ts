import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  getFavorite(): Observable<any> {
     return of([]);
  }

  createFavorite(data: any) {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }
  deleteFavorite(id: any) {
    return new Promise<any>((resolve, reject) => {
      resolve('res')
    });
  }
}
