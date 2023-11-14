import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusManagerComponent } from './campus-manager.component';

describe('CampusManagerComponent', () => {
  let component: CampusManagerComponent;
  let fixture: ComponentFixture<CampusManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampusManagerComponent]
    });
    fixture = TestBed.createComponent(CampusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
