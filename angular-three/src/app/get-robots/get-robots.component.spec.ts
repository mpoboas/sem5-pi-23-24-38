import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRobotsComponent } from './get-robots.component';

describe('GetRobotsComponent', () => {
  let component: GetRobotsComponent;
  let fixture: ComponentFixture<GetRobotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRobotsComponent]
    });
    fixture = TestBed.createComponent(GetRobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
