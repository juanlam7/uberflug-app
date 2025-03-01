import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Character } from '@models/characters';
import { FavoritesService, IHeroResponse } from '@services/favorites.service';

@Component({
  selector: 'favorite-btn',
  template: `
    <button
      (click)="isFavorite() ? deleteFavoriteBtn() : AddFavoriteBtn()"
      class="flex items-center justify-center p-3 rounded-full transition duration-300 ease-in-out absolute top-4 right-4"
      [ngStyle]="{
        backgroundColor: isFavorite()
          ? 'rgba(244, 63, 94, 1)'
          : 'rgba(255, 255, 255, 1)',
        color: isFavorite() ? 'white' : 'black',
      }"
      aria-label="heart icon">
      <mat-icon>{{ isFavorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
    </button>
  `,
  imports: [MatIcon, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  detail = input<Character | null>();
  detailFav = input<IHeroResponse | null>();
  favoritesService = inject(FavoritesService);

  isFavorite = computed(() => {
    return this.favoritesService
      .favorite()
      .some(
        item =>
          item.heroId === this.detail()?.id ||
          item.heroId === this.detailFav()?.heroId
      );
  });

  AddFavoriteBtn() {
    const favoriteId = this.detail()?.id ?? this.detailFav()!.heroId;
    const favoriteName = this.detail()?.name ?? this.detailFav()!.name;
    const favoriteImage = this.detail()?.thumbnail.path
      ? this.detail()?.thumbnail.path + '.' + this.detail()?.thumbnail.extension
      : this.detailFav()!.image;

    this.favoritesService
      .createFavorite(favoriteId, favoriteName, favoriteImage)
      .subscribe();
  }

  deleteFavoriteBtn() {
    const favoriteId = this.detail()?.id ?? this.detailFav()!.heroId;

    this.favoritesService.deleteFavorite(favoriteId).subscribe();
  }
}
