import { effect, inject, Injectable, signal } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
