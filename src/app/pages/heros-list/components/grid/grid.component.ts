import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { Character } from 'src/app/models/characters';
import { CharacterFilter } from '../../../../utils/pipes/characterFilter.pipe';

@Component({
  selector: 'grid-list',
  standalone: true,
  template: `
    <div class="flex flex-wrap justify-between">
      @for (
        item of charactersList() ?? [] | CharacterFilter: InputSearch();
        track item.id
      ) {
        @defer (on viewport) {
          <div class="w-60 p-2 mt-3 mb-3">
            <card [item]="item"></card>
          </div>
        } @placeholder {
          <div class="w-60 p-2 mt-3 mb-3">
            <!-- Add skeleton here while image hero is loading -->
            <div class="text-center">loading...</div>
          </div>
        }
      }
    </div>
  `,
  imports: [CharacterFilter, CommonModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  InputSearch = input.required<string>();
  charactersList = input.required<Character[] | null>();
}
