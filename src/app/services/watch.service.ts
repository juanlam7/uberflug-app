import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  private favSub= new Subject<any>();

  handlingViewChange: any = null;

  constructor() { }

  watchFeedChange(): Observable<any> {
    console.log('watch fav change view')
    return this.favSub.asObservable();
  }

  anotherView (View:any) {
    console.log(View)
    this.handlingViewChange = View;
    this.favSub.next(View)
  }
}