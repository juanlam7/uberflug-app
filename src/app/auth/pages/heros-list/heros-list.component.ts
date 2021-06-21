import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { WatchService } from 'src/app/services/watch.service';

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

  changeView: any;

  constructor(public charactersService: CharactersService, private favoritesService: FavoritesService, private watchService: WatchService) { }

  ngOnInit(): void {
    this.watchService.watchFeedChange().subscribe((res) => {
      this.changeView = res;
      this.page = 1;
      //console.log(res);
      this.charactersService.getAllCharacters().subscribe(resp => {
        this.favoritesService.getFavorite().subscribe((value) => {
          let favCharactes: any = []
          for (let i = 0; i < value.length; i++) {
            let characterIDFire = value[i].payload.doc.id;
            let objCharacter:any = value[i].payload.doc.data();
            
            let objFavs = resp.data.results.filter((obj:any) => {
              if (obj.id === objCharacter.id) { 
                obj.id_fire = characterIDFire;
                return obj
               }
            })
            favCharactes.push(objFavs[0])
          }
          if (this.changeView === 'fav') {
            this.allCharacters = favCharactes;
            localStorage.setItem('CharactersFav',  JSON.stringify(this.allCharacters))
            //console.log(this.allCharacters)
          } else {
            this.allCharacters = resp.data.results;
            localStorage.setItem('Characters',  JSON.stringify(this.allCharacters))
            //console.log(this.allCharacters)
          }
        })
        this.isLoading = true;
      }, (error) => {
        console.log(error);
      });
    })
    this.watchService.handlingViewChange === null ? this.changeView = this.watchService.anotherView('init') : this.changeView = 'fav';
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