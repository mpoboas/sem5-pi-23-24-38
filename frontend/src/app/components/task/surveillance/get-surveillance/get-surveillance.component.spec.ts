import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSurveillanceComponent } from './get-surveillance.component';

describe('GetSurveillanceComponent', () => {
  let component: GetSurveillanceComponent;
  let fixture: ComponentFixture<GetSurveillanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetSurveillanceComponent]
    });
    fixture = TestBed.createComponent(GetSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
