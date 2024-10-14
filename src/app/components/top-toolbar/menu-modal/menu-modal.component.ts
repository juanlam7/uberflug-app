import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WatchService } from 'src/app/services/watch.service';

@Component({
  selector: 'app-menu-modal',
  standalone: true,
  templateUrl: './menu-modal.component.html',
  imports: [
    MatIconModule,
    MatListModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MenuModalComponent implements OnInit {

  isLoading: boolean = true;

  formatHourComic: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private watchService: WatchService,
    private router: Router,
    public dialogRef: MatDialogRef<MenuModalComponent>) { }

  ngOnInit() {
  }

  changeView(view: any) {
    this.isLoading = false;
    setTimeout(() => {
      this.watchService.anotherView(view);
      this.isLoading = true;
      this.dialogRef.close();
    }, 100);
    this.router.navigate(['/hero-list']);
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