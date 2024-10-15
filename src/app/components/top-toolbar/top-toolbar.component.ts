import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { MenuModalComponent } from './menu-modal/menu-modal.component';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  imports: [MatDialogModule, RouterModule]
})
export class TopToolbarComponent {

  userData = {
    name: 'juan',
    email: 'juan@test.com'
  }

  dialog = inject(MatDialog);

  openPopUp(data: any = []) {
    const title = 'Menu'
    const dialogRef: MatDialogRef<any> = this.dialog.open(MenuModalComponent, {
      width: '360px',
      height: '400px',
      position: {
        top: '70px',
        right: '90px'
      },
      backdropClass: 'backdropClass',
      disableClose: false,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return
        }
        console.log(res)
      })
  }
}