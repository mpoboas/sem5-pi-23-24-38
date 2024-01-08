import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePickupAndDeliveryComponent } from './create-pickup-and-delivery.component';

describe('CreatePickupAndDeliveryComponent', () => {
  let component: CreatePickupAndDeliveryComponent;
  let fixture: ComponentFixture<CreatePickupAndDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePickupAndDeliveryComponent]
    });
    fixture = TestBed.createComponent(CreatePickupAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
