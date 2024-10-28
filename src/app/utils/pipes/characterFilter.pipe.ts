import { Pipe, PipeTransform } from '@angular/core';
import { Character } from 'src/app/models/characters';

@Pipe({ name: 'CharacterFilter', standalone: true })
export class CharacterFilter implements PipeTransform {
  transform(items: Character[], value: string): Character[] {
    if (!items) {
      return [];
    }
    if (!value) {
      return items;
    }
    value = value.toLocaleLowerCase();

    return items.filter(element => {
      return element.name.toLocaleLowerCase().includes(value);
    });
  }
}
