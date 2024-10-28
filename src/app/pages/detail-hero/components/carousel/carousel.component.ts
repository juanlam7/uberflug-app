import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Comic } from 'src/app/models/comics';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'carousel',
  standalone: true,
  template: `
    @if (AllComics(); as AllComics) {
      <div class="row">
        @for (item of AllComics.slice(0, 10); track item.id) {
          @defer (on viewport) {
            <div class="col d-inline-block overflow-hidden text-truncate p-0">
              <img
                class="img-carousel"
                src="{{ item?.thumbnail?.path }}.{{
                  item?.thumbnail?.extension
                }}"
                alt="..."
                (click)="openPopUp(item)" />
              <p class="text-center">{{ item.title }}</p>
            </div>
          } @placeholder {
            <div class="col-2 mt-3 mb-3">
              <div>cargando...</div>
            </div>
          }
        }
      </div>
    }
  `,
  styles: `
    .img-carousel {
      padding: 1rem;
      border-radius: 2rem;
      max-height: 14rem;
      min-height: 14rem;
      object-fit: cover;
    }
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  AllComics = input.required<Comic[] | null>();

  dialog = inject(MatDialog);

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
