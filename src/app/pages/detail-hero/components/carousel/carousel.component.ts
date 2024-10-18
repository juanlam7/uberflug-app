import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { Character } from 'src/app/types/characters';
import { Comic } from 'src/app/types/comics';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'carusel-comics',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarosuelComicsComponent {
  detail = input.required<Character>();

  AllComics = signal<Comic[] | null>(null);

  charactersService = inject(CharactersService);
  dialog = inject(MatDialog);

  constructor() {
    effect(cleanUp => {
      const subscription = this.charactersService
        .getComictsByCharacter(this.detail().comics.collectionURI)
        .subscribe(p => this.AllComics.set(p));

      cleanUp(() => subscription.unsubscribe());
    });
  }

  openPopUp(data: any = []) {
    const title = 'Heros';
    const dialogRef: MatDialogRef<any> = this.dialog.open(ModalComponent, {
      width: '1080px',
      disableClose: false,
      data: { title: title, payload: data },
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      console.log(res);
    });
  }
}
