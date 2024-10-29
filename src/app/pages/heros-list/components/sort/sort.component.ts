import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Character } from '@models/characters';
import { sortArrayByName, type orderArr } from '@utils/stringsMethods';

@Component({
  selector: 'sort-button',
  standalone: true,
  template: `
    <button
      class="border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"
      (click)="sortAllCharacters()">
      {{ charactersOrder() }}
    </button>
  `,
  imports: [MatButton, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  charactersList = input.required<WritableSignal<Character[] | null>>();

  charactersOrder = signal<orderArr>('asc');

  sortAllCharacters(): void {
    this.charactersOrder.update(val => (val === 'asc' ? 'desc' : 'asc'));

    this.charactersList().update(val =>
      sortArrayByName(val ?? [], this.charactersOrder())
    );
  }
}
