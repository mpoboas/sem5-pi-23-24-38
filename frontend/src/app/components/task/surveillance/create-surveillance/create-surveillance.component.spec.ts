import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveillanceComponent } from './create-surveillance.component';

describe('CreateSurveillanceComponent', () => {
  let component: CreateSurveillanceComponent;
  let fixture: ComponentFixture<CreateSurveillanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSurveillanceComponent]
    });
    fixture = TestBed.createComponent(CreateSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
