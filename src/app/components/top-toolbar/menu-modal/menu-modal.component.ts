import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { WatchService } from 'src/app/services/watch.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html'
})
export class MenuModalComponent implements OnInit {

  formatHourComic: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private authService: AuthService,
                private watchService: WatchService,
                private router: Router,
                public dialogRef: MatDialogRef<MenuModalComponent>) { }

  ngOnInit() {
  }

  changeView(view:any) {
    this.watchService.anotherView(view);
    this.dialogRef.close();
  }

  async logout() {
    try {
      await this.authService.logout();
      localStorage.clear();
      this.router.navigate(['/']);
      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }
}