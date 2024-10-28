import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { StoreFavService } from 'src/app/services/storeFav.service';

@Component({
  selector: 'heros-fav-list',
  standalone: true,
  templateUrl: './heros-list-fav.component.html',
  styleUrls: ['./heros-list-fav.component.scss'],
  imports: [CommonModule, CardComponent],
})
export class HerosListFavComponent {
  storeFavService = inject(StoreFavService);
}
