import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: any;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  /* detalle(id: string) {
    this.route.navigate(['/detail', id]);
  } */
}