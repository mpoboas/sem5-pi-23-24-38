import { Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RobotTypeService } from '../robot-type/robot-type.service';

export interface RobotTypeData {
  tasks?: string[];
  brand: string;
  model: string;
  designation: string;


}
@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.scss']
})



export class CreateRobotTypeComponent {
  form: FormGroup;
  taskOptions: string[] = ['Vigilance', 'PickUp&Delivery'];
  selectedRobotTypeId: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RobotTypeData,
    public dialogRef: MatDialogRef<CreateRobotTypeComponent>,
    private fb: FormBuilder,
    public robotTypeService: RobotTypeService,
  ) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      designation: ['', Validators.required],
    });
    this.taskOptions.forEach(task => {
      this.form.addControl(task, new FormControl(false)); // Add checkboxes dynamically
    });
  }

  getTaskControl(task: string): FormControl {
    return this.form.get(task) as FormControl;
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const { brand, model,designation}=this.form.value;
      const selectedTasks = this.taskOptions.filter(task => this.form.get(task)?.value);

      const robotTypeData = {
        brand,
        model,
        tasks: selectedTasks,
        designation,

      };
      
      // Call the createRobotType method from your RobotTypeService
      this.robotTypeService.createRobotType(robotTypeData).subscribe(
        (response: any) => {
          console.log('RobotType created successfully', response);
          this.dialogRef.close(robotTypeData);
          window.location.reload();
        },
        (error: any) => {
          console.error('Error creating robotType', error);
        }
      );
    }
  


  }
}
