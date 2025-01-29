import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Character, DataResponse } from '@models/characters';
import { CharactersService } from '@services/characters.service';
import { SpinnerService } from '@services/spinner.service';
import { ScrollNearEndDirective } from '@utils/directives/scroll-near-end.directive';
import { GridComponent } from './components/grid/grid.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';

const INITIAL_VALUES = {
  offset: 0,
  limit: 0,
  total: 0,
  count: 0,
  results: [],
};

@Component({
  selector: 'heros-list',
  templateUrl: './heros-list.component.html',
  imports: [
    CommonModule,
    ScrollNearEndDirective,
    SearchComponent,
    SortComponent,
    GridComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {
  charactersService = inject(CharactersService);
  spinnerService = inject(SpinnerService);

  limit = signal<number>(12);
  offset = signal<number>(0);

  dataResponse = signal<DataResponse>(INITIAL_VALUES);

  InputFieldSearchValue = signal<string>('');

  constructor() {
    effect(cleanUp => {
      const subscription = this.charactersService
        .getAllCharacters(
          this.limit(),
          this.offset(),
          this.InputFieldSearchValue()
        )
        .subscribe(p => this.dataResponse.set(p));

      cleanUp(() => subscription.unsubscribe());
    });
  }

  allCharacters = linkedSignal<DataResponse, Character[]>({
    source: this.dataResponse,
    computation: (source, prev): Character[] =>
      prev?.value ? [...prev.value, ...source.results] : source.results,
  });

  onNearEndScroll(): void {
    if (this.offset() < this.dataResponse().total) {
      this.offset.update(oldvalue => oldvalue + 12);
    }
  }
}
