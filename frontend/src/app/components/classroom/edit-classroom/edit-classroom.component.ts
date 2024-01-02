import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassroomService } from '../../../services/classroom.service';
import { FloorService } from '../../../services/floor.service';

export interface ClassroomData {
  id: string;
  name: string;
  description: string;
  category: string;
  length: number;
  width: number;
  floorId: string;
  cordx: number;
  cordy: number;
}

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})

export class EditClassroomComponent {
  form: FormGroup;
  floorOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ClassroomData,
    public dialogRef: MatDialogRef<EditClassroomComponent>,
    private fb: FormBuilder,
    private classroomService: ClassroomService,
    private floorService: FloorService,
    ) {
    this.form = this.fb.group({
      id: [data.id, Validators.required],
      name: [data.name],
      description: [data.description],
      category: [data.category],
      length: [data.length],
      width: [data.width],
      floorId: [data.floorId],
      cordx: [data.cordx],
      cordy: [data.cordy]
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
      const classroomData = this.form.value

      this.floorService.findFloorByNumber(classroomData.floorId).subscribe(
        (floor: any) => {
          classroomData.floorId = floor ? floor.id : null;
          console.log('Floor data:', classroomData);

          // Call the createFloor method from your FloorService
          this.classroomService.updateClassroom(classroomData).subscribe(
            (response: any) => {
              console.log('Classroom updated successfully', response);
              this.dialogRef.close(classroomData);
              window.location.reload();
            },
            (error: any) => {
              console.error('Error updating classroom', error);
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
