import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Character } from 'src/app/types/characters';

@Component({
  selector: 'favorite-btn',
  standalone: true,
  template: `
    <button
      (click)="favoriteButton()"
      [ngClass]="customClass()"
      mat-fab
      color="rgba(255,255,255,1)"
      aria-label="heart icon">
      <mat-icon>favorite_border</mat-icon>
    </button>
    <!-- <button
              (click)="favoriteButton(detail)"
              class="fav_button"
              mat-fab
              color="warn"
              aria-label="Example icon button with a heart icon">
              <mat-icon>favorite</mat-icon>
            </button> -->
  `,
  styleUrls: ['./favorite.component.scss'],
  imports: [MatIcon, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  detail = input.required<Character | null>();
  customClass = input.required<string>();
  title = 'uberflug-app';

  favoriteButton() {
    console.log('Add to favorite');
    // add logic here to save selected character as favorite and update signal to render change button
  }
}
