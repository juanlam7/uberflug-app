import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

interface IHeroResponse {
  id: string;
  name: string;
  heroId: number;
  __typename: string;
}

interface IGetFavorite {
  allFavorites: IHeroResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly apollo = inject(Apollo);

  getFavorite(): Observable<IHeroResponse[]> {
    return this.apollo
      .watchQuery<IGetFavorite>({
        query: gql`
          query AllFavoritesByUser {
            allFavorites {
              id
              name
              heroId
            }
          }
        `,
      })
      .valueChanges.pipe(map(res => res.data.allFavorites));
  }

  createFavorite(data: any) {
    return new Promise<any>((resolve, reject) => {
      resolve('res');
    });
  }
  deleteFavorite(id: any) {
    return new Promise<any>((resolve, reject) => {
      resolve('res');
    });
  }
}
