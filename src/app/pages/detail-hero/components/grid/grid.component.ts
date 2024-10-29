import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comic } from 'src/app/models/comics';

@Component({
  selector: 'grid-list',
  standalone: true,
  template: `
    <div class="flex flex-wrap -mx-2">
      @for (item of AllComics(); track item.id) {
        @defer (on viewport) {
          <div class="w-1/6 px-2 mt-3 mb-3">
            <img
              class="w-full h-auto rounded"
              src="{{ item?.thumbnail?.path }}.{{ item?.thumbnail?.extension }}"
              alt="..." />
            <p class="text-center mt-1 text-sm font-medium">{{ item.title }}</p>
          </div>
        } @placeholder {
          <div class="w-1/6 px-2 mt-3 mb-3">
            <div
              class="h-32 flex items-center justify-center border border-gray-200 rounded">
              <div>Cargando...</div>
            </div>
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
