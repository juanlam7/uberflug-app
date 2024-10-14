import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [MatIconModule, MatDialogModule]
})
export class ModalComponent implements OnInit {

  formatHourComic: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
    this.formatHourComic = moment(this.data.payload?.dates[0].date).format('LL');
  }
}