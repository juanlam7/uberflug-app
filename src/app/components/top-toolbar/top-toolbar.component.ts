import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuModalComponent } from './menu-modal/menu-modal.component';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  userData: any;

  constructor(private authService: AuthService, 
              private router: Router,
              private dialog: MatDialog,
              private snack: MatSnackBar,) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then(resp => {
      this.userData = resp;
    })
  }

  openPopUp (data: any = []) {
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
        data: {title: title, payload: data}
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