import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { Character } from 'src/app/types/characters';
import { CharacterFilter } from '../../../../utils/pipes/characterFilter.pipe';

@Component({
  selector: 'grid-list',
  standalone: true,
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  imports: [CharacterFilter, CommonModule, CardComponent],
  // TODO: Improve state logic to apply on push here
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  InputSearch = input.required<string>();
  charactersList = input.required<Character[]>();
}
