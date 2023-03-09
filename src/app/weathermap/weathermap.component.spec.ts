import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathermapComponent } from './weathermap.component';

describe('WeathermapComponent', () => {
  let component: WeathermapComponent;
  let fixture: ComponentFixture<WeathermapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeathermapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeathermapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
