import { TestBed } from '@angular/core/testing';
import { HerosListFavComponent } from './heros-list-fav.component';

describe('HerosListFavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerosListFavComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HerosListFavComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
