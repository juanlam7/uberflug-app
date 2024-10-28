import { TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
