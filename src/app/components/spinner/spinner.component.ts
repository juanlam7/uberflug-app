import { Component, inject } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'spinner',
  imports: [],
  template: ` @if (isLoading()) {
    <div
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div
        class="animate-spin h-32 w-32 border-8 border-t-8 border-t-yellow-500 border-gray-300 rounded-full"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  }`,
})
export default class SpinnerComponent {
  private readonly spinnerSvc = inject(SpinnerService);
  isLoading = this.spinnerSvc.isLoading;
}
