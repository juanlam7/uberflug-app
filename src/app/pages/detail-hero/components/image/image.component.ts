import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Character } from 'src/app/types/characters';

@Component({
  selector: 'image-hero',
  standalone: true,
  template: `
    <img
      class="hero_img"
      src="{{ detail().thumbnail.path }}.{{ detail().thumbnail.extension }}" />
  `,
  styles: `
    .hero_img {
      border-radius: 15px;
      min-width: 100%;
      max-height: 35em;
      object-fit: cover;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageHeroComponent {
  detail = input.required<Character>();
}
