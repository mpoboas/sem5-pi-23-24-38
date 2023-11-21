import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassroomComponent } from './get-classroom.component';

describe('GetClassroomComponent', () => {
  let component: GetClassroomComponent;
  let fixture: ComponentFixture<GetClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetClassroomComponent]
    });
    fixture = TestBed.createComponent(GetClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
