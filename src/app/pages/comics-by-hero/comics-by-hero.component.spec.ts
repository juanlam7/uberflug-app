import { TestBed } from '@angular/core/testing';
import { ComicsByHeroComponent } from './comics-by-hero.component';

describe('ComicsByHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsByHeroComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ComicsByHeroComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
