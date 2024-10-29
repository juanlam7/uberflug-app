import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'top-toolbar',
  standalone: true,
  templateUrl: './top-toolbar.component.html',
  imports: [MatDialogModule, RouterModule, MatIconModule, MatButtonModule],
})
export class TopToolbarComponent {
  userData = {
    name: 'juan',
  };

  authService = inject(AuthService);
  dialog = inject(MatDialog);

  openPopUp(data: any = []) {
    const title = 'Menu';
    const dialogRef: MatDialogRef<any> = this.dialog.open(MenuModalComponent, {
      width: '360px',
      height: '250px',
      position: {
        top: '70px',
        right: '90px',
      },
      backdropClass: 'backdropClass',
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
