import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';

import { CharactersService } from 'src/app/services/characters.service';

import { Character } from 'src/app/types/characters';

import { CardComponent } from 'src/app/components/card/card.component';
import { ScrollNearEndDirective } from 'src/app/utils/directives/scroll-near-end.directive';

@Component({
  selector: 'app-heros-list',
  standalone: true,
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
  imports: [CommonModule, CardComponent, ScrollNearEndDirective, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {
  charactersService = inject(CharactersService);

  allCharacters = signal<Character[] | null>(null);

  limit = signal<number>(12);
  offset = signal<number>(0);

  constructor() {
    effect(cleanUp => {
      const subscription = this.charactersService
        .getAllCharacters(this.limit(), this.offset())
        .subscribe(p => {
          this.allCharacters.update(val => (val ? [...val, ...p] : p));
        });

      cleanUp(() => subscription.unsubscribe());
    });
  }

  onNearEndScroll(): void {
    this.offset.update(oldvalue => oldvalue + 12);
  }
}
