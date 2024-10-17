import { TestBed } from '@angular/core/testing';
import { SortComponent } from './sort.component';

describe('SortComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SortComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
