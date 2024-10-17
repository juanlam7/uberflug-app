import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { Character } from 'src/app/types/characters';
import { CharacterFilter } from '../../../../utils/pipes/characterFilter.pipe';

@Component({
  selector: 'grid-list',
  standalone: true,
  template: `
    <div class="row mt-3">
      @for (
        item of charactersList() ?? [] | CharacterFilter: InputSearch();
        track item.id
      ) {
        @defer (on viewport) {
          <div class="col-2 mt-3 mb-3">
            <app-card [item]="item"></app-card>
          </div>
        } @placeholder {
          <div class="col-2 mt-3 mb-3">
            <!-- add skeleton here while image hero is loading -->
            <div>loading...</div>
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
