import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Character } from '@models/characters';
import { IHeroResponse } from '@services/favorites.service';
import { FavoriteComponent } from '../favorite-btn/favorite.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  imports: [CommonModule, RouterModule, FavoriteComponent],
})
export class CardComponent {
  @Input() item: Character | null = null;
  @Input() itemFav: IHeroResponse | null = null;

  route = inject(Router);
}
