import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RobotService } from './robot.service';
import { CreateRobotComponent } from '../create-robot/create-robot.component';

import { RobotComponent } from './robot.component';

describe('RobotComponent', () => {
  let component: RobotComponent;
  let fixture: ComponentFixture<RobotComponent>;
  let robotService: RobotService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotComponent],
      providers: [
        { provide: RobotService, useValue: { getRobots: () => of([]) } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of({}) }) } }
      ]
    });
    fixture = TestBed.createComponent(RobotComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch robots on initialization', () => {
    const robots = [{ id: 1, name: 'Robot 1' }, { id: 2, name: 'Robot 2' }];
    spyOn(robotService, 'getRobots').and.returnValue(of(robots));

    component.ngOnInit();

    expect(component.robots).toEqual(robots);
    expect(robotService.getRobots).toHaveBeenCalled();
  });

  it('should open create robot dialog', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    dialogRef.afterClosed.and.returnValue(of({}));

    component.openCreateRobot();

    expect(dialog.open).toHaveBeenCalledWith(CreateRobotComponent, {
      data: { nickname: '', serialNr: '', description: '', isActive: '', robotTypeId: '' },
      width: '400px'
    });
  });
});