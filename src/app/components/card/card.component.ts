import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Character } from 'src/app/types/characters';
import { FavoriteComponent } from '../favorite-btn/favorite.component';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, RouterModule, FavoriteComponent],
})
export class CardComponent {
  @Input() item: Character | null = null;

  route = inject(Router);

  detalle(id: number) {
    this.route.navigate(['/detail-hero', id]);
  }

  favoriteButton(item: Character) {
    console.log(item);
    // add logic here to save selected character as favorite
  }
}
