import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Comic } from '@models/comics';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'carousel',
  standalone: true,
  template: `
    @if (AllComics(); as AllComics) {
      <div class="flex flex-wrap -mx-2 justify-between">
        @for (item of AllComics.slice(0, 10); track item.id) {
          @defer (on viewport) {
            <div class="w-36 p-2">
              <!-- Adjust width as needed -->
              <img
                class="w-full h-auto rounded cursor-pointer"
                src="{{ item?.thumbnail?.path }}.{{
                  item?.thumbnail?.extension
                }}"
                alt="..."
                (click)="openPopUp(item)" />
              <p class="text-center mt-1 text-sm font-medium">
                {{ item.title }}
              </p>
            </div>
          } @placeholder {
            <div class="w-36 p-2">
              <div
                class="h-32 flex items-center justify-center border border-gray-200 rounded">
                <div>Cargando...</div>
              </div>
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
