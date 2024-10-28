import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import moment from 'moment';
import { FavoriteComponent } from 'src/app/components/favorite-btn/favorite.component';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'info-hero',
  standalone: true,
  template: `
    <div class="card p-5 card_description">
      <favorite-btn [detail]="detail()" customClass="fav-button--detail" />
      <h1 class="text_img">{{ detail().name }}</h1>
      <br />
      <p class="text-start">
        <span class="blue_text"
          >Update {{ formatDate(detail().modified) }}</span
        >
        <br />
        {{ detail().description }}
      </p>
    </div>
  `,
  styles: `
    .card_description {
      border-radius: 15px;
      margin-top: 50px;
      margin-left: -100px;
    }
    .blue_text {
      color: #0090ef;
      font-size: 12px;
      font-weight: bold;
    }
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
