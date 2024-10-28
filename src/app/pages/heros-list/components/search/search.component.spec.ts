import { TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
