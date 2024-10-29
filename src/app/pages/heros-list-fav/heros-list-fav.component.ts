import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { StoreFavService } from 'src/app/services/storeFav.service';

@Component({
  selector: 'heros-fav-list',
  standalone: true,
  template: `
    <div class="container mx-auto p-5 pt-20">
      @if (storeFavService.favorite(); as favorite) {
        <div class="flex flex-wrap mx-3 mt-3">
          @for (item of favorite; track item.id) {
            <div class="w-60 p-2 mt-3 mb-3">
              <card [itemFav]="item"></card>
            </div>
          }
        </div>
      }
    </div>
  `,
  imports: [CommonModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListFavComponent {
  storeFavService = inject(StoreFavService);
}
