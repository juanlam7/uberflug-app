import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-heros-list',
  templateUrl: './heros-list.component.html',
  styleUrls: ['./heros-list.component.scss']
})
export class HerosListComponent implements OnInit {

  allCharacters: any;
  page!: number;

  constructor(public charactersService: CharactersService) { }

  ngOnInit(): void {
    this.charactersService.getAllCharacters().subscribe(resp => {
      this.allCharacters = resp.data.results;
      console.log(this.allCharacters);
    }, (error) => {
      console.log(error);
    });
  }

}
