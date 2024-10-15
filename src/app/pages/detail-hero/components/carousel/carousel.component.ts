import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CharactersService } from 'src/app/services/characters.service';

import { Comic } from 'src/app/types/comics';

import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-carusel-comics',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [
    CarouselModule,
    CommonModule,
    CarosuelComicsComponent
  ],
})
export class CarosuelComicsComponent {
  @Input() urlComics: string = '';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 5
      },
      740: {
        items: 10
      },
      940: {
        items: 10
      }
    },
    nav: true
  }
  AllComics = signal<Comic[] | null>(null);

  charactersService = inject(CharactersService)
  dialog = inject(MatDialog)

  constructor() {
    effect((cleanUp) => {
      const subscription = this.charactersService.getComictsByCharacter(this.urlComics)
        .subscribe((p) => this.AllComics.set(p))

      cleanUp(() => subscription.unsubscribe());
    });
  }

  openPopUp(data: any = []) {
    const title = 'Heros'
    const dialogRef: MatDialogRef<any> = this.dialog.open(ModalComponent, {
      width: '1080px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          return
        }
        console.log(res)
      })
  }
}