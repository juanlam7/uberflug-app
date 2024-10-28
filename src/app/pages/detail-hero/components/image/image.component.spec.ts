import { TestBed } from '@angular/core/testing';
import { ImageHeroComponent } from './image.component';

describe('ImageHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageHeroComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ImageHeroComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
