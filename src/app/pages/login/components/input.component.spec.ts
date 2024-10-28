import { TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input.component';

describe('InputFieldComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InputFieldComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
