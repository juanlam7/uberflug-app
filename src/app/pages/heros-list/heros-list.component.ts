import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { CharactersService } from 'src/app/services/characters.service';

import { Character } from 'src/app/types/characters';

import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-heros-list',
  standalone: true,
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
  imports: [
    NgxPaginationModule,
    CommonModule,
    CardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {

  charactersService = inject(CharactersService)

  allCharacters = signal<Character[] | null>(null);

  constructor() {
    effect((cleanUp) => {
      const subscription = this.charactersService.getAllCharacters()
        .subscribe((p) => this.allCharacters.set(p))

      cleanUp(() => subscription.unsubscribe());
    });
  }
}
