import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [MatIconModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  formatHourComic: string = '';

  data = inject(MAT_DIALOG_DATA);

  formatDate(date: string) {
    return moment(date).format('LL');
  }
}
