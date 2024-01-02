import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFloorsComponent } from './get-floors.component';

describe('GetFloorsComponent', () => {
  let component: GetFloorsComponent;
  let fixture: ComponentFixture<GetFloorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetFloorsComponent]
    });
    fixture = TestBed.createComponent(GetFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
