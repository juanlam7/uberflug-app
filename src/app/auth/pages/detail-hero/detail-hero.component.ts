import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-detail-hero',
  templateUrl: './detail-hero.component.html',
  styleUrls: ['./detail-hero.component.scss']
})
export class DetailHeroComponent implements OnInit {
  title = 'ng-carousel-demo';
  
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

  detail: any;
  detailComics: any;

  constructor(private router: ActivatedRoute, private _route: Router, public charactersService: CharactersService) {}

  ngOnInit(): void {
    this.getDetailCharacter();
  }

  async getDetailCharacter() {
    
    const id = this.router.snapshot.paramMap.get('id');
    
    await this.charactersService.getDetailCharacter(id).subscribe(resp => {
      this.detail = resp.data.results[0];
      console.log(this.detail);
      this.getComictsByCharacter(this.detail.comics.collectionURI);
    }, (error) => {
      console.log(error);
    });
  }

  async getComictsByCharacter(url:string) {
    
    const id = this.router.snapshot.paramMap.get('id');
    
    await this.charactersService.getComictsByCharacter(url).subscribe(resp => {
      this.detailComics = resp.data.results;
      console.log(this.detailComics);
    }, (error) => {
      console.log(error);
    });
  }

}
