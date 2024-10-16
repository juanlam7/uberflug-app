import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CharactersService } from 'src/app/services/characters.service';

import { Character } from 'src/app/types/characters';
import { orderArr } from 'src/app/types/common';

import { CardComponent } from 'src/app/components/card/card.component';
import { ScrollNearEndDirective } from 'src/app/utils/directives/scroll-near-end.directive';
import { CharacterFilter } from 'src/app/utils/pipes/characterFilter.pipe';
import { sortArrayByName } from 'src/app/utils/stringsMethods';

@Component({
  selector: 'app-heros-list',
  standalone: true,
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
  imports: [
    CommonModule,
    CardComponent,
    ScrollNearEndDirective,
    JsonPipe,
    MatButton,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CharacterFilter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {
  charactersService = inject(CharactersService);

  allCharacters = signal<Character[] | null>(null);

  limit = signal<number>(12);
  offset = signal<number>(0);

  charactersOrder = signal<orderArr>('asc');

  InputFieldSearchValue = signal<string>('');

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

  sortAllCharacters(): void {
    this.charactersOrder.update(val => (val === 'asc' ? 'desc' : 'asc'));

    this.allCharacters.update(val =>
      sortArrayByName(val ?? [], this.charactersOrder())
    );
  }
}
