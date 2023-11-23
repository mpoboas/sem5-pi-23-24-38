import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoManagerComponent } from './info-manager.component';

describe('InfoManagerComponent', () => {
  let component: InfoManagerComponent;
  let fixture: ComponentFixture<InfoManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoManagerComponent]
    });
    fixture = TestBed.createComponent(InfoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
