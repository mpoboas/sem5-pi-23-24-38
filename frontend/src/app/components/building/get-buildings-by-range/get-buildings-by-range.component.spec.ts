import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBuildingsByRangeComponent } from './get-buildings-by-range.component';

describe('GetBuildingsByRangeComponent', () => {
  let component: GetBuildingsByRangeComponent;
  let fixture: ComponentFixture<GetBuildingsByRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetBuildingsByRangeComponent]
    });
    fixture = TestBed.createComponent(GetBuildingsByRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
