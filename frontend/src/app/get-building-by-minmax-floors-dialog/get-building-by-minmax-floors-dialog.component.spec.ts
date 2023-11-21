import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBuildingByMinmaxFloorsDialogComponent } from './get-building-by-minmax-floors-dialog.component';

describe('GetBuildingByMinmaxFloorsDialogComponent', () => {
  let component: GetBuildingByMinmaxFloorsDialogComponent;
  let fixture: ComponentFixture<GetBuildingByMinmaxFloorsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetBuildingByMinmaxFloorsDialogComponent]
    });
    fixture = TestBed.createComponent(GetBuildingByMinmaxFloorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
