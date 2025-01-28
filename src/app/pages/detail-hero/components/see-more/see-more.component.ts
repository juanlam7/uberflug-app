import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'see-more',
  template: `
    @if (seeMore(); as seeMore) {
      <div class="flex justify-between items-center p-4">
        <h1 class="text-xl font-bold">COMICS</h1>

        <button
          mat-stroked-button
          color="warn"
          (click)="toggleSeeMoreButton()"
          class="flex items-center border-2 border-red-500 text-red-500 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-red-500 hover:text-white">
          <mat-icon
            [ngStyle]="{
              transform: seeMore() ? 'rotate(-90deg)' : 'rotate(90deg)',
              transition: 'transform 0.3s ease',
            }">
            chevron_right
          </mat-icon>
          <span class="ml-2">{{ seeMore() ? 'Ver menos' : 'Ver mas' }}</span>
        </button>
      </div>
    }
  `,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeeMoreComponent {
  seeMore = input.required<WritableSignal<boolean>>();

  toggleSeeMoreButton() {
    this.seeMore().update(val => !val);
  }
}
