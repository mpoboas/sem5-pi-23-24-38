import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetElevatorsComponent } from './get-elevators.component';

describe('GetElevatorsComponent', () => {
  let component: GetElevatorsComponent;
  let fixture: ComponentFixture<GetElevatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetElevatorsComponent]
    });
    fixture = TestBed.createComponent(GetElevatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
