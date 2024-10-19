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
import { Character } from 'src/app/types/characters';
import { CarosuelComicsComponent } from './components/carousel/carousel.component';
import { ImageHeroComponent } from './components/image/image.component';
import { InfoHeroComponent } from './components/info/info.component';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  templateUrl: './detail-hero.component.html',
  imports: [
    CommonModule,
    ImageHeroComponent,
    InfoHeroComponent,
    CarosuelComicsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeroComponent {
  detail = signal<Character | null>(null);

  charactersService = inject(CharactersService);
  router = inject(ActivatedRoute);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(cleanUp => {
      const subscription = this.charactersService
        .getDetailCharacter(id)
        .subscribe(p => this.detail.set(p[0]));

      cleanUp(() => {
        subscription.unsubscribe();
      });
    });
  }
}
