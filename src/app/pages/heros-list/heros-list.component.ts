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
import { ScrollNearEndDirective } from 'src/app/utils/directives/scroll-near-end.directive';
import { GridComponent } from './components/grid/grid.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';

@Component({
  selector: 'heros-list',
  standalone: true,
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
  imports: [
    CommonModule,
    ScrollNearEndDirective,
    JsonPipe,
    SearchComponent,
    SortComponent,
    GridComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {
  charactersService = inject(CharactersService);

  allCharacters = signal<Character[] | null>(null);

  limit = signal<number>(12);
  offset = signal<number>(0);
  total = signal<number>(0);

  InputFieldSearchValue = signal<string>('');

  constructor() {
    effect(cleanUp => {
      const subscription = this.charactersService
        .getAllCharacters(this.limit(), this.offset())
        .subscribe(p => {
          this.total.set(p.total);
          this.allCharacters.update(val =>
            val ? [...val, ...p.results] : p.results
          );
        });

      cleanUp(() => subscription.unsubscribe());
    });
  }

  onNearEndScroll(): void {
    if (this.offset() < this.total()) {
      this.offset.update(oldvalue => oldvalue + 12);
    }
  }
}
