
/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { CreateRobotComponent } from './create-robot.component';
import { RobotService } from '../robot/robot.service';
import { RobotTypeService } from '../robot-type/robot-type.service';

describe('CreateRobotComponent', () => {
  let component: CreateRobotComponent;
  let fixture: ComponentFixture<CreateRobotComponent>;
  let mockDialogRef: MatDialogRef<CreateRobotComponent>;
  let mockFormBuilder: FormBuilder;
  let mockRobotService: RobotService;
  let mockRobotTypeService: RobotTypeService;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockFormBuilder = jasmine.createSpyObj(['group']);
    mockRobotService = jasmine.createSpyObj(['createRobot']);
    mockRobotTypeService = jasmine.createSpyObj(['getRobotTypes', 'findRobotTypeById']);

    TestBed.configureTestingModule({
      declarations: [CreateRobotComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: RobotService, useValue: mockRobotService },
        { provide: RobotTypeService, useValue: mockRobotTypeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRobotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadRobotTypeOptions', () => {
      spyOn(component, 'loadRobotTypeOptions');
      component.ngOnInit();
      expect(component.loadRobotTypeOptions).toHaveBeenCalled();
    });
  });

  describe('loadRobotTypeOptions', () => {
    it('should set robotTypeOptions with the response from robotTypeService', () => {
      const mockRobotTypes = [{ id: 1, name: 'Robot 1' }, { id: 2, name: 'Robot 2' }];
      mockRobotTypeService.getRobotTypes.and.returnValue(of(mockRobotTypes));

      component.loadRobotTypeOptions();

      expect(component.robotTypeOptions).toEqual(mockRobotTypes);
    });

    it('should log an error if there is an error fetching robot types', () => {
      const mockError = 'Error fetching robot types';
      spyOn(console, 'error');
      mockRobotTypeService.getRobotTypes.and.returnValue(throwError(mockError));

      component.loadRobotTypeOptions();

      expect(console.error).toHaveBeenCalledWith('Error fetching robot types', mockError);
    });
  });

  describe('onCancel', () => {
    it('should close the dialog', () => {
      component.onCancel();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      component.form = jasmine.createSpyObj(['valid', 'value']);
      component.form.valid = true;
      component.form.value = {
        nickname: 'Robot 1',
        serialNr: '12345',
        description: 'Test robot',
        isActive: true,
        robotTypeId: 1
      };
    });

    it('should call findRobotTypeById with the selected robotTypeId', () => {
      const mockRobotType = { id: 1, name: 'Robot 1' };
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(mockRobotType));

      component.onSave();

      expect(mockRobotTypeService.findRobotTypeById).toHaveBeenCalledWith(1);
    });

    it('should set robotData.robotTypeId to the id of the found robotType', () => {
      const mockRobotType = { id: 1, name: 'Robot 1' };
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(mockRobotType));

      component.onSave();

      expect(component.robotData.robotTypeId).toEqual(1);
    });

    it('should set robotData.robotTypeId to null if no robotType is found', () => {
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(null));

      component.onSave();

      expect(component.robotData.robotTypeId).toBeNull();
    });

    it('should call createRobot with the robotData', () => {
      const mockResponse = { id: 1, nickname: 'Robot 1' };
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(null));
      mockRobotService.createRobot.and.returnValue(of(mockResponse));

      component.onSave();

      expect(mockRobotService.createRobot).toHaveBeenCalledWith(component.robotData);
    });

    it('should log an error if there is an error finding robotType by id', () => {
      const mockError = 'Error finding RobotType by id';
      spyOn(console, 'error');
      mockRobotTypeService.findRobotTypeById.and.returnValue(throwError(mockError));

      component.onSave();

      expect(console.error).toHaveBeenCalledWith('Error finding RobotType by id', mockError);
    });

    it('should log an error if there is an error creating Robot', () => {
      const mockError = 'Error creating Robot';
      spyOn(console, 'error');
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(null));
      mockRobotService.createRobot.and.returnValue(throwError(mockError));

      component.onSave();

      expect(console.error).toHaveBeenCalledWith('Error creating Robot', mockError);
    });

    it('should close the dialog and reload the page on successful robot creation', () => {
      const mockResponse = { id: 1, nickname: 'Robot 1' };
      spyOn(window.location, 'reload');
      mockRobotTypeService.findRobotTypeById.and.returnValue(of(null));
      mockRobotService.createRobot.and.returnValue(of(mockResponse));

      component.onSave();

      expect(mockDialogRef.close).toHaveBeenCalledWith(component.robotData);
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});*/