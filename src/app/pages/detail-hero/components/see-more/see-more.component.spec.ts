import { TestBed } from '@angular/core/testing';
import { SeeMoreComponent } from './see-more.component';

describe('SeeMoreComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeMoreComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SeeMoreComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
