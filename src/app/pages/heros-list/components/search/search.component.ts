import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'search-field',
  standalone: true,
  template: `
    <mat-form-field class="form-field" appearance="fill">
      <mat-label>Search</mat-label>
      <input matInput type="text" [(ngModel)]="InputSearch" />
      <button
        *ngIf="InputSearch()"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="InputSearch.set('')">
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
}
