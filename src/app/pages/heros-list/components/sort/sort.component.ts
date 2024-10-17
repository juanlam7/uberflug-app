import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Character } from 'src/app/types/characters';
import { orderArr } from 'src/app/types/common';
import { sortArrayByName } from 'src/app/utils/stringsMethods';

@Component({
  selector: 'sort-button',
  standalone: true,
  template: `
    <button color="warn" mat-stroked-button (click)="sortAllCharacters()">
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
