import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'modal',
  template: `
    <div class="p-5">
      <mat-icon
        mat-dialog-close
        aria-hidden="false"
        class="float-right"
        aria-label="Example home icon">
        close
      </mat-icon>
      <div class="mt-3 flex flex-col lg:flex-row">
        <div class="w-full lg:w-5/12">
          <img
            class="w-auto h-[500px] object-cover"
            src="{{ data.payload?.thumbnail.path }}.{{
              data.payload?.thumbnail.extension
            }}" />
        </div>
        <div class="w-full lg:w-7/12 mt-4 lg:mt-0 lg:ml-4">
          <h1 class="text-2xl font-bold">{{ data.payload?.title }}</h1>
          <p class="text-left">
            <span class="text-blue-500 text-xs font-bold">
              Published {{ formatDate(this.data.payload?.dates[0].date) }}
            </span>
            <br />
            {{ data.payload?.description }}
          </p>
        </div>
      </div>
    </div>
  `,
  imports: [MatIconModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  formatHourComic: string = '';

  data = inject(MAT_DIALOG_DATA);

  formatDate(date: string) {
    return formatDate(date, 'longDate', 'en-US');
  }
}
