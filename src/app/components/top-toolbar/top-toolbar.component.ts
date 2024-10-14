import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WatchService } from 'src/app/services/watch.service';
import { MenuModalComponent } from './menu-modal/menu-modal.component';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  imports: [MatDialogModule, MatSnackBarModule]
})
export class TopToolbarComponent implements OnInit {

  userData: any;

  constructor(private authService: AuthService,
    private router: Router,
    private watchService: WatchService,
    private dialog: MatDialog,
    private snack: MatSnackBar,) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(resp => {
      this.userData = resp;
    })
  }

  changeView(view: any) {
    setTimeout(() => {
      this.watchService.anotherView(view);
    }, 100);
    this.router.navigate(['']);
  }

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