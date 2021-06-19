import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uberflug-app';

// Para simular inicio de sesión con un token
/*   constructor() { 
    const user =  localStorage.setItem('Token', 'asddasd');
    console.log(localStorage.getItem('Token'));
  } */
}
