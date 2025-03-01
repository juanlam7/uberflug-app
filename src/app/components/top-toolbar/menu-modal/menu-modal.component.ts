import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'menu-modal',
  templateUrl: './menu-modal.component.html',
  imports: [
    MatIconModule,
    MatListModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class MenuModalComponent {
  dialogRef = inject(MatDialogRef<MenuModalComponent>);
  router = inject(Router);
  authService = inject(AuthService);
}
