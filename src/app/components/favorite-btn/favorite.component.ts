import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Character } from 'src/app/models/characters';
import { FavoritesService } from 'src/app/services/favorites.service';
import { StoreFavService } from 'src/app/services/storeFav.service';

@Component({
  selector: 'favorite-btn',
  standalone: true,
  template: `
    <button
      (click)="isFavorite() ? deleteFavoriteBtn() : AddFavoriteBtn()"
      [ngClass]="customClass()"
      mat-fab
      [color]="isFavorite() ? 'warn' : 'rgba(255,255,255,1)'"
      aria-label="heart icon">
      <mat-icon>{{ isFavorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
    </button>
  `,
  styleUrls: ['./favorite.component.scss'],
  imports: [MatIcon, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  detail = input.required<Character | null>();
  customClass = input.required<string>();
  favoritesService = inject(FavoritesService);
  storeFavService = inject(StoreFavService);

  isFavorite = signal<boolean>(false);

  constructor() {
    effect(
      () => {
        this.isFavorite.set(
          this.storeFavService
            .favorite()
            .some(item => item.heroId === this.detail()?.id)
        );
      },
      { allowSignalWrites: true }
    );
  }

  AddFavoriteBtn() {
    const { id, name, thumbnail } = this.detail()!;
    this.favoritesService
      .createFavorite(id, name, thumbnail.path + '.' + thumbnail.extension)
      .subscribe();
  }

  deleteFavoriteBtn() {
    const { id } = this.detail()!;
    this.favoritesService.deleteFavorite(id).subscribe();
  }
}
