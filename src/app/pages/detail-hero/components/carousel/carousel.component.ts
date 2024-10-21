import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { Comic } from 'src/app/types/comics';
import { ScrollNearEndDirective } from 'src/app/utils/directives/scroll-near-end.directive';
import { ModalComponent } from '../modal/modal.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'carusel-comics',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ScrollNearEndDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CarosuelComicsComponent {
  AllComics = signal<Comic[] | null>(null);

  charactersService = inject(CharactersService);
  dialog = inject(MatDialog);
  router = inject(ActivatedRoute);

  seeMore = signal<boolean>(false);

  constructor() {
    const id = this.router.snapshot.paramMap.get('id');
    effect(cleanUp => {
      if (id) {
        const subscription = this.charactersService
          .getComicsByCharacter(parseInt(id))
          .subscribe(p => this.AllComics.set(p));

        cleanUp(() => subscription.unsubscribe());
      }
    });
  }

  toggleSeeMoreButton() {
    this.seeMore.update(val => !val);
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

  onNearEndScroll(): void {
    console.log('LLEGO AL FINAL');
  }
}
