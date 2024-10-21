import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comic } from 'src/app/types/comics';

@Component({
  selector: 'grid-list',
  standalone: true,
  template: `
    <div class="row">
      @for (item of AllComics(); track item.id) {
        @defer (on viewport) {
          <div class="col-2 mt-3 mb-3">
            <img
              class="card_imgde"
              src="{{ item?.thumbnail?.path }}.{{ item?.thumbnail?.extension }}"
              alt="..." />
            <p class="text-center">{{ item.title }}</p>
          </div>
        } @placeholder {
          <div class="col-2 mt-3 mb-3">
            <div>cargando...</div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .card_imgde {
      width: 100%;
      border-radius: 15px;
      min-width: 100%;
      min-height: 25em;
      max-height: 25em;
      object-fit: cover;
    }
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  AllComics = input.required<Comic[] | null>();
}
