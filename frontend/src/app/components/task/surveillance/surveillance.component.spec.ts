import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveillanceComponent } from './surveillance.component';

describe('SurveillanceComponent', () => {
  let component: SurveillanceComponent;
  let fixture: ComponentFixture<SurveillanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveillanceComponent]
    });
    fixture = TestBed.createComponent(SurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
