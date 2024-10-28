import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { StoreFavService } from 'src/app/services/storeFav.service';

@Component({
  selector: 'heros-fav-list',
  standalone: true,
  template: `
    <div class="container-fluid p-5">
      @if (storeFavService.favorite(); as favorite) {
        <div class="row mt-3">
          @for (item of favorite; track item.id) {
            <div class="col-2 mt-10 mb-3">
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
