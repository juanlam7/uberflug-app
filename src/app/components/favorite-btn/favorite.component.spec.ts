import { TestBed } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FavoriteComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
