import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Character } from 'src/app/models/characters';
import { IHeroResponse } from 'src/app/services/favorites.service';
import { FavoriteComponent } from '../favorite-btn/favorite.component';

@Component({
  selector: 'card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, RouterModule, FavoriteComponent],
})
export class CardComponent {
  @Input() item: Character | null = null;
  @Input() itemFav: IHeroResponse | null = null;

  route = inject(Router);

  detalle(id: number) {
    this.route.navigate(['/detail-hero', id]);
  }
}
