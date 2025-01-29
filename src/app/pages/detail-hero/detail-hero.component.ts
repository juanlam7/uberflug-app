import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@models/characters';
import { CharactersService } from '@services/characters.service';
import { map } from 'rxjs';
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
  charactersService = inject(CharactersService);
  router = inject(ActivatedRoute);

  id = this.router.snapshot.paramMap.get('id');

  detail = toSignal<Character>(
    this.charactersService.getDetailCharacter(this.id).pipe(map(p => p[0])),
    {}
  );
}
