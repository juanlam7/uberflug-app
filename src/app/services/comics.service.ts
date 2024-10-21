import { effect, inject, Injectable, signal } from '@angular/core';
import { Comic } from '../types/comics';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  ComicsList = signal<Comic[] | null>(null);
  characterId = signal<number>(0);

  charactersService = inject(CharactersService);

  constructor() {
    effect(
      cleanUp => {
        const subscription = this.charactersService
          .getComicsByCharacter(this.characterId())
          .subscribe(p => this.ComicsList.set(p));

        cleanUp(() => {
          this.ComicsList.set(null);
          subscription.unsubscribe();
        });
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  setCharacterId(characterId: number) {
    this.characterId.set(characterId);
  }
}
