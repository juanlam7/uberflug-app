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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';
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
  AllComics = signal<Comic[] | null>(null);

  comicsService = inject(ComicsService);
  dialog = inject(MatDialog);
  router = inject(ActivatedRoute);
  id = this.router.snapshot.paramMap.get('id');

  constructor() {
    effect(
      () => {
        if (this.id) {
          this.comicsService.setCharacterId(parseInt(this.id));
          this.AllComics.set(this.comicsService.ComicsList());
        }
      },
      {
        allowSignalWrites: true,
      }
    );
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
