import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from 'src/app/components/card/card.component';
import { TopToolbarComponent } from 'src/app/components/top-toolbar/top-toolbar.component';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters';

@Component({
  selector: 'app-heros-list',
  standalone: true,
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss'],
  imports: [
    NgxPaginationModule,
    CommonModule,
    CardComponent,
    TopToolbarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HerosListComponent {

  charactersService = inject(CharactersService)

  allCharacters = signal<Character[] | null>(null);

  constructor() {
    effect((cleanUp) => {
      const subscription = this.charactersService.getAllCharacters()
        .subscribe((p) => this.allCharacters.set(p))

      cleanUp(() => subscription.unsubscribe());
    });
  }
}
