import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { Comic } from 'src/app/types/comics';
import { ScrollNearEndDirective } from 'src/app/utils/directives/scroll-near-end.directive';
import { GridComponent } from '../grid/grid.component';
import { SeeMoreComponent } from '../see-more/see-more.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'comics',
  standalone: true,
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
  AllComics = signal<Comic[] | null>(null);

  charactersService = inject(CharactersService);
  router = inject(ActivatedRoute);

  seeMore = signal<boolean>(false);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(cleanUp => {
      if (id) {
        const subscription = this.charactersService
          .getComicsByCharacter(parseInt(id))
          .subscribe(p => this.AllComics.set(p));

        cleanUp(() => subscription.unsubscribe());
      }
    });
  }

  onNearEndScroll(): void {
    console.log('LLEGO AL FINAL');
  }
}
