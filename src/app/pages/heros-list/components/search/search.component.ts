import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Character } from '@models/characters';

@Component({
  selector: 'search-field',
  template: `
    <div class="relative w-fit">
      <mat-form-field class="w-full" appearance="fill">
        <mat-label class="text-gray-700">Search</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="InputSearch"
          (input)="onSearchInput($event)"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
        <button
          *ngIf="InputSearch()"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="this.resetToInitialValues()"
          class="absolute right-2 top-1/2 transform -translate-y-1/2">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </div>
  `,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() InputSearch: WritableSignal<string> = signal('');
  Offset = input.required<WritableSignal<number>>();
  CharactersList = input.required<WritableSignal<Character[] | null>>();

  onSearchInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;

    if (searchQuery.length === 0) {
      this.resetToInitialValues();
    }
  }

  resetToInitialValues() {
    this.InputSearch.set('');
    this.Offset().set(0);
    this.CharactersList().set([]);
  }
}
