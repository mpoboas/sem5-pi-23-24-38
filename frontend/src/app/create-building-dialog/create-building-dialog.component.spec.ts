import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingDialogComponent } from './create-building-dialog.component';

describe('CreateBuildingDialogComponent', () => {
  let component: CreateBuildingDialogComponent;
  let fixture: ComponentFixture<CreateBuildingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildingDialogComponent]
    });
    fixture = TestBed.createComponent(CreateBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
