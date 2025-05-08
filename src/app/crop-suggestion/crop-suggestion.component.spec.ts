import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropSuggestionComponent } from './crop-suggestion.component';

describe('CropSuggestionComponent', () => {
  let component: CropSuggestionComponent;
  let fixture: ComponentFixture<CropSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
