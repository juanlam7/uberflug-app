import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '@services/characters.service';
import { Character } from '@models/characters';
import { ComicsComponent } from './components/comics/comics.component';
import { ImageHeroComponent } from './components/image/image.component';
import { InfoHeroComponent } from './components/info/info.component';

@Component({
  selector: 'detail-hero',
  templateUrl: './detail-hero.component.html',
  imports: [
    CommonModule,
    ImageHeroComponent,
    InfoHeroComponent,
    ComicsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeroComponent {
  detail = signal<Character | null>(null);

  charactersService = inject(CharactersService);
  router = inject(ActivatedRoute);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(
      cleanUp => {
        const subscription = this.charactersService
          .getDetailCharacter(id)
          .subscribe(p => this.detail.set(p[0]));

        cleanUp(() => {
          subscription.unsubscribe();
        });
      },
    );
  }
}
