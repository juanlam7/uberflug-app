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
  standalone: true,
  template: `
    @if (seeMore(); as seeMore) {
      <div class="row">
        <div class="col" style="display: flex; justify-content: space-between">
          <h1 style="margin: 0">COMICS</h1>

          <button
            mat-stroked-button
            color="warn"
            (click)="toggleSeeMoreButton()">
            <mat-icon
              [ngStyle]="{
                transform: seeMore() ? 'rotate(-90deg)' : 'rotate(90deg)',
                transition: 'transform 0.3s ease',
              }"
              >chevron_right</mat-icon
            >
            {{ seeMore() ? 'Ver menos' : 'Ver mas' }}
          </button>
        </div>
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
