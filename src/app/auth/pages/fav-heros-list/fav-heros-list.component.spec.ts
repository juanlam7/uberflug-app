import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavHerosListComponent } from './fav-heros-list.component';

describe('FavHerosListComponent', () => {
  let component: FavHerosListComponent;
  let fixture: ComponentFixture<FavHerosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavHerosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavHerosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
