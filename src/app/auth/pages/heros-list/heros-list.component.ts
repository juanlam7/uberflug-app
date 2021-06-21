import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss']
})
export class HerosListComponent implements OnInit {

  isLoading: boolean = false;

  allCharacters: any;
  page!: number;
  results: number = 12;
  diffOrder: boolean = false;

  constructor(public charactersService: CharactersService) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters().subscribe(resp => {
      this.allCharacters = resp.data.results;
      console.log(this.allCharacters);
      localStorage.setItem('Characters',  JSON.stringify(this.allCharacters))
      this.isLoading = true;
    }, (error) => {
      console.log(error);
    });
  }

  changeOrder() {
    this.diffOrder === false ? this.diffOrder = true : this.diffOrder = false;
    this.allCharacters.sort(this.sortFunc);
  }

  sortFunc (a: any, b: any) {
    return b === a ? 0 : b < a ? 1 : -1;
  }

  onPageChange(event?:any) {
    event === 9 ? this.results = 4 : this.results = 12;
  }
}