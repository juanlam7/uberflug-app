import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import moment from 'moment';
import { FavoriteComponent } from 'src/app/components/favorite-btn/favorite.component';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters';
import { CarosuelComicsComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  templateUrl: './detail-hero.component.html',
  styleUrls: ['./detail-hero.component.scss'],
  imports: [
    CommonModule,
    CarosuelComicsComponent,
    RouterModule,
    FavoriteComponent,
  ],
})
export class DetailHeroComponent {
  detail = signal<Character | null>(null);
  urlGetComics = signal<string | null>(null);
  diffFav: boolean = false;

  charactersService = inject(CharactersService);
  router = inject(ActivatedRoute);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(cleanUp => {
      const subscription = this.charactersService
        .getDetailCharacter(id)
        .subscribe(p => {
          this.detail.set(p[0]);
          this.urlGetComics.set(p[0].comics.collectionURI);
        });

      cleanUp(() => {
        subscription.unsubscribe();
      });
    });
  }

  formatDate(date: string) {
    return moment(date).format('LL');
  }
}
