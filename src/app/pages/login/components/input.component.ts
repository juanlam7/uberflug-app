import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-field',
  standalone: true,
  template: `
    <mat-form-field class="w-100" appearance="fill">
      <mat-label>{{ label() }}</mat-label>
      <mat-icon matPrefix class="ms-2 me-3">{{ prefixIcon() }}</mat-icon>
      <input
        [type]="
          type() === 'password' ? (hidePassword ? 'password' : 'text') : 'email'
        "
        matInput
        [placeholder]="placeholder()"
        [formControl]="control()"
        [required]="required()"
        [attr.aria-describedby]="errorId()" />

      @if (type() === 'password') {
        <button
          mat-icon-button
          matSuffix
          type="button"
          (click)="hidePassword = !hidePassword"
          [attr.aria-label]="'Hide password'"
          [attr.aria-pressed]="hidePassword">
          <mat-icon>{{
            hidePassword ? 'visibility_off' : 'visibility'
          }}</mat-icon>
        </button>
      }
      <mat-icon matSuffix class="ms-2 me-3" *ngIf="control()?.value">
        {{ control().valid ? 'check' : 'close' }}
      </mat-icon>
      <mat-error
        [id]="errorId()"
        aria-live="assertive"
        *ngIf="control()?.invalid && (control()?.touched || control()?.dirty)">
        {{ errorMessage() }}
      </mat-error>
    </mat-form-field>
  `,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class InputFieldComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  placeholder = input.required<string>();
  type = input.required<string>();
  required = input.required<boolean>();
  prefixIcon = input.required<string>();
  errorMessage = input.required<string>();
  errorId = input.required<string>();

  hidePassword = true;
}
