import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetManagerComponent } from './fleet-manager.component';

describe('FleetManagerComponent', () => {
  let component: FleetManagerComponent;
  let fixture: ComponentFixture<FleetManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FleetManagerComponent]
    });
    fixture = TestBed.createComponent(FleetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
