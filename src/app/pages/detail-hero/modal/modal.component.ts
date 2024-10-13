import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [AngularMaterialModule]
})
export class ModalComponent implements OnInit {

  formatHourComic: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {
    this.formatHourComic = moment(this.data.payload?.dates[0].date).format('LL');
  }
}