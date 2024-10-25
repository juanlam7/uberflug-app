import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'heros-fav-list',
  standalone: true,
  templateUrl: './heros-list-fav.component.html',
  styleUrls: ['./heros-list-fav.component.scss'],
  imports: [CommonModule],
})
export class HerosListFavComponent {
  favoritesService = inject(FavoritesService);

  favorite$ = this.favoritesService.getFavorite();
  favorite = toSignal(this.favorite$, {
    initialValue: [],
  });
}
