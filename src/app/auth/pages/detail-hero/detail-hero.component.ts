import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalComponent } from './modal/modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-hero',
  templateUrl: './detail-hero.component.html',
  styleUrls: ['./detail-hero.component.scss']
})
export class DetailHeroComponent implements OnInit {

  isLoading: boolean = false;
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
  detailComics: any =[];
  formatHour: any;
  diffFav: boolean = false;

  constructor(private router: ActivatedRoute, 
              private _route: Router, 
              public charactersService: CharactersService,
              private dialog: MatDialog,
              private snack: MatSnackBar,) {}

  ngOnInit(): void {
    this.getDetailCharacter();
  }

  async getDetailCharacter() {
    
    const id = this.router.snapshot.paramMap.get('id');
    
    await this.charactersService.getDetailCharacter(id).subscribe(resp => {
      this.detail = resp.data.results[0];
      console.log(this.detail);
      this.formatHour = moment(this.detail?.modified).format('LL');
      this.getComictsByCharacter(this.detail.comics.collectionURI);
    }, (error) => {
      console.log(error);
    });
  }

  async getComictsByCharacter(url:string) {
    let fullURL = url;
    let notHTTP = fullURL.substring(4, fullURL.length);
    const id = this.router.snapshot.paramMap.get('id');
    
    await this.charactersService.getComictsByCharacter(notHTTP).subscribe(resp => {
      this.detailComics = resp.data.results;
      console.log(this.detailComics);
      this.isLoading = true;
    }, (error) => {
      console.log(error);
    });
  }

  openPopUp (data: any = []) {
    const title = 'Heros'
    const dialogRef: MatDialogRef<any> = this.dialog.open(ModalComponent, {
        width: '1080px',
        disableClose: true,
        data: {title: title, payload: data}
    })
    dialogRef.afterClosed()
        .subscribe(res => {
            if (!res) {
                return
            }
            console.log(res)
        })
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