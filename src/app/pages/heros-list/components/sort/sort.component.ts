import {
    ChangeDetectionStrategy,
    Component,
    input,
    signal
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Character } from 'src/app/types/characters';
import { orderArr } from 'src/app/types/common';
import { sortArrayByName } from 'src/app/utils/stringsMethods';

@Component({
  selector: 'sort-button',
  standalone: true,
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  imports: [MatButton, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  charactersList = input.required<Character[]>();

  charactersOrder = signal<orderArr>('asc');

  sortAllCharacters(): void {
    this.charactersOrder.update(val => (val === 'asc' ? 'desc' : 'asc'));

    sortArrayByName(this.charactersList(), this.charactersOrder())
  }
}
