import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopToolbarComponent } from '@components/top-toolbar/top-toolbar.component';
import SpinnerComponent from '@components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <top-toolbar />
    <router-outlet />
    <spinner />
  `,
  imports: [RouterOutlet, TopToolbarComponent, SpinnerComponent],
})
export class AppComponent {}
