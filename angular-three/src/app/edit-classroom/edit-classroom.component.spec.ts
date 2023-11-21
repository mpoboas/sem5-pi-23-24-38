import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassroomComponent } from './edit-classroom.component';

describe('EditClassroomComponent', () => {
  let component: EditClassroomComponent;
  let fixture: ComponentFixture<EditClassroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClassroomComponent]
    });
    fixture = TestBed.createComponent(EditClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
