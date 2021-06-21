import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav-heros-list',
  templateUrl: './fav-heros-list.component.html',
  styleUrls: ['./fav-heros-list.component.scss']
})
export class FavHerosListComponent implements OnInit {

  isLoading: boolean = false;

  allCharacters: any;
  page!: number;
  results: number = 12;
  diffOrder: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let exist = JSON.parse(localStorage.getItem('Favoritos')!);
    if(exist === null) {
      console.log('No hay favoritos');
      
    } else {
      this.allCharacters = exist;
      this.results = this.allCharacters.length;
    }
  }

  changeOrder() {
    this.diffOrder === false ? this.diffOrder = true : this.diffOrder = false;
    this.allCharacters.sort(this.sortFunc);
  }

  sortFunc (a: any, b: any) {
    return b === a ? 0 : b < a ? 1 : -1;
  }
}