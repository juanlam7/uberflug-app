import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: any;
  diffFav: boolean = false;

  constructor(private route: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  detalle(id: string) {
    this.route.navigate(['/auth/detail-hero', id]);
  }

  favoriteButton(item: any) {
    this.diffFav === false ? this.diffFav = true : this.diffFav = false;
    if (item.id_fire){
      this.favoritesService.deleteFavorite(item.id_fire).then((value) => {
        delete item.id_fire
      })
    } else {
      this.favoritesService.createFavorite(item).then((value) => {
        item.id_fire = value.id
      })
    }
  }
}