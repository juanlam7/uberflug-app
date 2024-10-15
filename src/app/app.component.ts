import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uberflug-app';
}
