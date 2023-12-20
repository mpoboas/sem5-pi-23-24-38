import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingComponent } from './building.component';
import { BuildingService } from './building.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('BuildingComponent', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;
  let buildingService: BuildingService;
  let dialog: MatDialog;

  beforeEach(() => {
    buildingService = jasmine.createSpyObj('BuildingService', ['getBuildings']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [BuildingComponent],
      providers: [
        { provide: BuildingService, useValue: buildingService },
        { provide: MatDialog, useValue: dialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch buildings on initialization', () => {
    const buildings = [{ id: 1, name: 'Building 1' }, { id: 2, name: 'Building 2' }];
    spyOn(buildingService, 'getBuildings').and.returnValue(of(buildings));

    component.ngOnInit();

    expect(component.buildings).toEqual(buildings);
    expect(buildingService.getBuildings).toHaveBeenCalled();
  });

  it('should handle error when fetching buildings', () => {
    const error = 'Error fetching buildings';
    spyOn(buildingService, 'getBuildings').and.returnValue(of(error));

    spyOn(console, 'error');

    component.ngOnInit();

    expect(console.error).toHaveBeenCalledWith('Error fetching buildings', error);
  });

  it('should open create building dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of({}));

    component.openCreateBuildingDialog();

    expect(dialog.open).toHaveBeenCalled();
    expect(dialogRef.afterClosed).toHaveBeenCalled();
  });

  it('should open get building by min/max floors dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of({}));

    component.openGetBuildingByMinMaxFloorsDialog();

    expect(dialog.open).toHaveBeenCalled();
    expect(dialogRef.afterClosed).toHaveBeenCalled();
  });
});