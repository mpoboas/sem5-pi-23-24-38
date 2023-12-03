import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RobotService } from '../robot/robot.service';
import { RobotTypeService } from '../robot-type/robot-type.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RobotData {
  nickname: string;
  serialNr: string;
  description: string;
  isActive: boolean;
  robotTypeId: string;

}

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.scss']
})
export class CreateRobotComponent implements OnInit {
  form: FormGroup;
  robotTypeOptions: any[] = [];
  selectedRobotTypeId: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RobotData,
    public dialogRef: MatDialogRef<CreateRobotComponent>,
    private fb: FormBuilder,
    private robotService: RobotService,
    private robotTypeService: RobotTypeService,
  ){
    this.form = this.fb.group({
      nickname: [data.nickname, Validators.required],
      serialNr: [data.serialNr, Validators.required],
      description: [data.description],
      isActive: [true],
      robotTypeId: [data.robotTypeId, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRobotTypeOptions();
  }

  loadRobotTypeOptions(): void {
    this.robotTypeService.getRobotTypes().subscribe(
      (robotTypes: any[]) => {
        this.robotTypeOptions = robotTypes;
      },
      (error: any) => {
        console.error('Error fetching robot types', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const robotData = {
        nickname: this.form.value.nickname,
        serialNr: this.form.value.serialNr,
        description: this.form.value.description,
        isActive: this.form.value.isActive,
        robotTypeId: null,
      };
  
      const robotTypeId = this.form.value.robotTypeId;
  
      this.robotTypeService.findRobotTypeById(robotTypeId).subscribe(
        (robotType: any) => {
          robotData.robotTypeId = robotType ? robotType.id : null;
          console.log('Robot data:', robotData);
  
          // Call the createRobot method from your RobotService
          this.robotService.createRobot(robotData).subscribe(
            (response: any) => {
              console.log('Robot created successfully', response);
              this.dialogRef.close(robotData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error creating Robot', error);
            }
          );
        },
        (error: any) => {
          console.error('Error finding RobotType by id', error);
        }
      );
    }
  }

}
