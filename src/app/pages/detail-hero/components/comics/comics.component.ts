import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic, DataResponseComic } from '@models/comics';
import { CharactersService } from '@services/characters.service';
import { SpinnerService } from '@services/spinner.service';
import { ScrollNearEndDirective } from '@utils/directives/scroll-near-end.directive';
import { CarouselComponent } from '../carousel/carousel.component';
import { GridComponent } from '../grid/grid.component';
import { SeeMoreComponent } from '../see-more/see-more.component';

const INITIAL_VALUES = {
  offset: 0,
  limit: 0,
  total: 0,
  count: 0,
  results: [],
};

@Component({
  selector: 'comics',
  templateUrl: './comics.component.html',
  imports: [
    CommonModule,
    ScrollNearEndDirective,
    GridComponent,
    SeeMoreComponent,
    CarouselComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ComicsComponent {
  charactersService = inject(CharactersService);
  spinnerService = inject(SpinnerService);

  router = inject(ActivatedRoute);

  seeMore = signal<boolean>(false);

  limit = signal<number>(12);
  offset = signal<number>(0);

  dataResponse = signal<DataResponseComic>(INITIAL_VALUES);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(cleanUp => {
      if (id) {
        const subscription = this.charactersService
          .getComicsByCharacter(parseInt(id), this.limit(), this.offset())
          .subscribe(p => this.dataResponse.set(p));

        cleanUp(() => subscription.unsubscribe());
      }
    });
  }

  AllComics = linkedSignal<DataResponseComic, Comic[]>({
    source: this.dataResponse,
    computation: (source, prev): Comic[] =>
      prev?.value ? [...prev.value, ...source.results] : source.results,
  });

  onNearEndScroll(): void {
    if (this.offset() < this.dataResponse().total) {
      this.offset.update(oldvalue => oldvalue + 12);
    }
  }
}
