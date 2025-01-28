import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Directive({
  selector: '[appScrollNearEnd]',
})
export class ScrollNearEndDirective {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter();
  private scrollThreshold: number = 100;
  private scrollSubject: Subject<void> = new Subject();

  constructor() {
    this.scrollSubject.pipe(debounceTime(300)).subscribe(() => {
      this.nearEnd.emit();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - scrollPosition <= this.scrollThreshold) {
      this.scrollSubject.next();
    }
  }
}
