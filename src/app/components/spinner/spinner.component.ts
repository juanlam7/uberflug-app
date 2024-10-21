import { Component, inject } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [],
  template: ` @if (isLoading()) {
    <div
      class="overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        class="spinner-border text-warning"
        style="width: 8rem; height: 8rem;"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }`,
})
export default class SpinnerComponent {
  private readonly spinnerSvc = inject(SpinnerService);
  isLoading = this.spinnerSvc.isLoading;
}
