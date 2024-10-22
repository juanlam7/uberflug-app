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
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Character } from 'src/app/models/characters';

@Component({
  selector: 'search-field',
  standalone: true,
  template: `
    <mat-form-field class="form-field" appearance="fill">
      <mat-label>Search</mat-label>
      <input
        matInput
        type="text"
        [(ngModel)]="InputSearch"
        (input)="onSearchInput($event)" />
      <button
        *ngIf="InputSearch()"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="this.resetToInitialValues()">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  imports: [
    CommonModule,
    MatButton,
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
