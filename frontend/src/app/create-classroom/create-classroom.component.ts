import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassroomService } from '../classroom/classroom.service';
import { FloorService } from '../floor/floor.service';
import { Location } from '@angular/common';


export interface ClassroomData {
  name: string;
  description: string;
  category: string;
  length: number;
  width: number;
  floorNumber: string;
  cordx: number;
  cordy: number;
}

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.scss']
})
export class CreateClassroomComponent {
  form: FormGroup;
  floorOptions: any[] = []; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ClassroomData,
    public dialogRef: MatDialogRef<CreateClassroomComponent>,
    private fb: FormBuilder,
    private classroomService: ClassroomService,
    private floorService: FloorService,
    
    ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
      category: [data.category, Validators.required],
      length: [data.length, Validators.required],
      width: [data.width, Validators.required],
      floorNumber: [data.floorNumber, Validators.required],
      cordx: [data.cordx, Validators.required],
      cordy: [data.cordy, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFloorOptions();
  }

  loadFloorOptions(): void {
    this.floorService.getFloors().subscribe(
      (floors: any[]) => {
        this.floorOptions = floors;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const classroomData = {
        name: this.form.value.name,
        description: this.form.value.description,
        category: this.form.value.category,
        length: this.form.value.length,
        width: this.form.value.width,
        floorId: null,
        cordx: this.form.value.cordx,
        cordy: this.form.value.cordy
      };

      const floorNumber = this.form.value.floorNumber;
      
      this.floorService.findFloorByNumber(floorNumber).subscribe(
        (floor: any) => {
          classroomData.floorId = floor ? floor.id : null;
          console.log('Floor data:', classroomData);
  
          // Call the createFloor method from your FloorService
          this.classroomService.createClassroom(classroomData).subscribe(
            (response: any) => {
              console.log('Classroom created successfully', response);
              this.dialogRef.close(classroomData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error creating classroom', error);
            }
          );
        },
        (error: any) => {
          console.error('Error finding floor by number', error);
        }
      );
    }
  }
}
