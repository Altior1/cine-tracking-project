import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddComponentComponent } from './movie-add-component.component';

describe('MovieAddComponentComponent', () => {
  let component: MovieAddComponentComponent;
  let fixture: ComponentFixture<MovieAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAddComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
