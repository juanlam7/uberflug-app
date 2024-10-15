import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

import { Character } from 'src/app/types/characters';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterModule]
})
export class CardComponent {

  @Input() item: Character | null = null;

  route =  inject(Router);

  detalle(id: number) {
    this.route.navigate(['/detail-hero', id]);
  }

  favoriteButton(item: Character) {
    console.log(item)
    // add logic here to save selected character as favorite
  }
}