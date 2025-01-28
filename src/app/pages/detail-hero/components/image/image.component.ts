import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Character } from '@models/characters';

@Component({
  selector: 'image-hero',
  template: `
    <img
      class="rounded-lg min-w-full max-h-[35em] object-cover"
      src="{{ detail().thumbnail.path }}.{{ detail().thumbnail.extension }}" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageHeroComponent {
  detail = input.required<Character>();
}
