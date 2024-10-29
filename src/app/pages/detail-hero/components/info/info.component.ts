import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import moment from 'moment';
import { FavoriteComponent } from 'src/app/components/favorite-btn/favorite.component';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'info-hero',
  standalone: true,
  template: `
    <div class="relative bg-white p-5 rounded-lg shadow-md mt-12 -ml-24">
      <favorite-btn [detail]="detail()" />
      <h1 class="text-xl font-bold text-gray-800 mt-3">{{ detail().name }}</h1>
      <br />
      <p class="text-left">
        <span class="text-blue-500 text-xs font-bold"
          >Update {{ formatDate(detail().modified) }}</span
        >
        <br />
        {{ detail().description }}
      </p>
    </div>
  `,
  imports: [FavoriteComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoHeroComponent {
  detail = input.required<Character>();

  formatDate(date: string) {
    return moment(date).format('LL');
  }
}
