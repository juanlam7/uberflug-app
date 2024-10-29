import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const getAllFavoriteSchema = gql`
  query AllFavoritesByUser {
    allFavorites {
      id
      name
      heroId
      image
    }
  }
`;

export interface IHeroResponse {
  id: string;
  name: string;
  heroId: number;
  image: string;
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

  favorite$ = this.getFavorite();
  favorite = toSignal(this.favorite$, {
    initialValue: [],
  });

  getFavorite(): Observable<IHeroResponse[]> {
    return this.apollo
      .watchQuery<IGetFavorite>({
        query: getAllFavoriteSchema,
      })
      .valueChanges.pipe(map(res => res.data.allFavorites));
  }

  createFavorite(heroId: number, name: string, image: string) {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation AddFavorite($heroId: Float!, $name: String!, $image: String!) {
          addFavorite(heroId: $heroId, name: $name, image: $image) {
            id
            name
            image
            heroId
          }
        }
      `,
      variables: {
        heroId,
        name,
        image,
      },
      refetchQueries: [
        {
          query: getAllFavoriteSchema,
        },
      ],
    });
  }

  deleteFavorite(heroId: number) {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation DeleteFavorite($heroId: Float!) {
          deleteFavorite(heroId: $heroId)
        }
      `,
      variables: {
        heroId,
      },
      refetchQueries: [
        {
          query: getAllFavoriteSchema,
        },
      ],
    });
  }
}
