import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPickupAndDeliveryComponent } from './get-pickup-and-delivery.component';

describe('GetPickupAndDeliveryComponent', () => {
  let component: GetPickupAndDeliveryComponent;
  let fixture: ComponentFixture<GetPickupAndDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPickupAndDeliveryComponent]
    });
    fixture = TestBed.createComponent(GetPickupAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
