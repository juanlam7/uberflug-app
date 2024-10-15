import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import moment from 'moment';

import { CharactersService } from 'src/app/services/characters.service';

import { Character } from 'src/app/types/characters';

import { CarosuelComicsComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'app-detail-hero',
  standalone: true,
  templateUrl: './detail-hero.component.html',
  styleUrls: ['./detail-hero.component.scss'],
  imports: [
    MatIcon,
    MatButtonModule,
    CommonModule,
    CarosuelComicsComponent,
    RouterModule,
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

  favoriteButton(item: Character) {
    console.log(item);
    // add logic here to save selected character as favorite
  }
}
