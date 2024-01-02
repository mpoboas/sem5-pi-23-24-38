/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateRobotTypeComponent } from './create-robot-type.component';
import { RobotTypeService } from '../robot-type/robot-type.service';
import { of } from 'rxjs';
import { throwError } from 'rxjs';

describe('CreateRobotTypeComponent', () => {
  let component: CreateRobotTypeComponent;
  let fixture: ComponentFixture<CreateRobotTypeComponent>;
  let mockDialogRef: MatDialogRef<CreateRobotTypeComponent>;
  let mockRobotTypeService: RobotTypeService;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockRobotTypeService = jasmine.createSpyObj(['createRobotType']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateRobotTypeComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: RobotTypeService, useValue: mockRobotTypeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRobotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancel', () => {
    it('should close the dialog', () => {
      component.onCancel();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onSave', () => {
    it('should call createRobotType method and close the dialog on success', () => {
      const mockFormValue = {
        brand: 'Test Brand',
        model: 'Test Model',
        designation: 'Test Designation',
        Vigilance: true,
        'PickUp&Delivery': false
      };
      const mockSelectedTasks = ['Vigilance'];
      const mockRobotTypeData = {
        brand: 'Test Brand',
        model: 'Test Model',
        tasks: mockSelectedTasks,
        designation: 'Test Designation'
      };

      component.form.setValue(mockFormValue);
      spyOn(component.robotTypeService, 'createRobotType').and.returnValue(of({}));
      spyOn(window.location, 'reload');

      component.onSave();

      expect(component.robotTypeService.createRobotType).toHaveBeenCalledWith(mockRobotTypeData);
      expect(mockDialogRef.close).toHaveBeenCalledWith(mockRobotTypeData);
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('should handle error when creating robotType', () => {
      const mockFormValue = {
        brand: 'Test Brand',
        model: 'Test Model',
        designation: 'Test Designation',
        Vigilance: true,
        'PickUp&Delivery': false
      };

      component.form.setValue(mockFormValue);
      spyOn(component.robotTypeService, 'createRobotType').and.returnValue(
        throwError('Error creating robotType')
      );

      component.onSave();

      expect(component.robotTypeService.createRobotType).toHaveBeenCalledWith({
        brand: 'Test Brand',
        model: 'Test Model',
        tasks: ['Vigilance'],
        designation: 'Test Designation'
      });
      expect(console.error).toHaveBeenCalledWith('Error creating robotType', 'Error creating robotType');
    });

    it('should not call createRobotType method if form is invalid', () => {
      spyOn(component.robotTypeService, 'createRobotType');

      component.onSave();

      expect(component.robotTypeService.createRobotType).not.toHaveBeenCalled();
    });
  });
});*/