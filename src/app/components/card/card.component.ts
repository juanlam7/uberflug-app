import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: any;
  diffFav: boolean = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  detalle(id: string) {
    this.route.navigate(['/auth/detail-hero', id]);
  }

  favoriteButton() {
    this.diffFav === false ? this.diffFav = true : this.diffFav = false;
    console.log('Works')
  }
}