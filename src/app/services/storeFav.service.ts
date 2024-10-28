import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root',
})
export class StoreFavService {
  favoritesService = inject(FavoritesService);

  favorite$ = this.favoritesService.getFavorite();
  favorite = toSignal(this.favorite$, {
    initialValue: [],
  });
}
