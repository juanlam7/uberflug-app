import { TestBed } from '@angular/core/testing';
import { InfoHeroComponent } from './info.component';

describe('InfoHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoHeroComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InfoHeroComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
