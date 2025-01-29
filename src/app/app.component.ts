import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import SpinnerComponent from '@components/spinner/spinner.component';
import { TopToolbarComponent } from '@components/top-toolbar/top-toolbar.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    @if (init().length > 0) {
      <top-toolbar />
      <router-outlet />
    } @else {
      <div
        style="background-image: url('../assets/images/Image-2@2x.png')"
        class="flex items-center justify-end h-screen bg-gray-100 bg-cover"></div>
    }
    <spinner
      [spinnerText]="
        this.init().length > 0
          ? ''
          : 'Development approach, wait a moment the backend server must be turned on.'
      " />
  `,
  imports: [RouterOutlet, TopToolbarComponent, SpinnerComponent],
})
export class AppComponent {
  // Development approach, wait a moment the backend server must be turned on.
  private readonly authService = inject(AuthService);
  initiation$ = this.authService.initCall();

  init = toSignal(this.initiation$, {
    initialValue: '',
  });
}
