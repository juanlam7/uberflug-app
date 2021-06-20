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

  favoriteButton(item: any) {
    this.diffFav === false ? this.diffFav = true : this.diffFav = false;
    let exist = JSON.parse(localStorage.getItem('Favoritos')!);
    if(exist === null) {
      localStorage.setItem('Favoritos',  JSON.stringify([item]))
    } else {
      let check = exist.find((fav:any) => {
        return fav.id === item.id
      })
      if(check){
        let updatedExist = exist.filter((item:any) => item.id !== check.id);
        localStorage.setItem('Favoritos',  JSON.stringify(updatedExist))
      } else {
        exist.push(item)
        localStorage.setItem('Favoritos',  JSON.stringify(exist))
      }
    }
  }
}