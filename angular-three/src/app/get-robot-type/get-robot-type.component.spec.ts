import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRobotTypeComponent } from './get-robot-type.component';

describe('GetRobotTypeComponent', () => {
  let component: GetRobotTypeComponent;
  let fixture: ComponentFixture<GetRobotTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRobotTypeComponent]
    });
    fixture = TestBed.createComponent(GetRobotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
