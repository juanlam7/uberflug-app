import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';
import { Comic } from 'src/app/types/comics';

@Component({
  selector: 'comics-by-hero',
  standalone: true,
  templateUrl: './comics-by-hero.component.html',
  styleUrls: ['./comics-by-hero.component.scss'],
  imports: [CommonModule],
})
export class ComicsByHeroComponent {
  comicsList = signal<Comic[] | null>(null);

  comicsService = inject(ComicsService);
  router = inject(ActivatedRoute);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(
      () => {
        if (id) {
          this.comicsService.setCharacterId(parseInt(id));
          this.comicsList.set(this.comicsService.ComicsList());
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
