import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaneamentoService } from '../planeamento/planeamento.service';
import { Location } from '@angular/common';
import { FloorService } from '../floor/floor.service';
import { ClassroomService } from '../classroom/classroom.service';

export interface TrajetoriaData {
  startingFloor: string;
  endingFloor: string;
  startingClassroom: string;
  endingClassroom: string;
}

@Component({
  selector: 'app-get-trajetoria',
  templateUrl: './get-trajetoria.component.html',
  styleUrls: ['./get-trajetoria.component.scss']
})
export class GetTrajetoriaComponent {
  form: FormGroup;
  trajeto: JSON;
  floorOptions: any[] = [];
  startingClassroomOptions: any[] = [];
  endingClassroomOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TrajetoriaData,
    public dialogRef: MatDialogRef<GetTrajetoriaComponent>,
    private fb: FormBuilder,
    private planeamentoService: PlaneamentoService,
    private floorService: FloorService,
    private classroomService: ClassroomService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      startingFloor: [data.startingFloor, Validators.required],
      endingFloor: [data.endingFloor, Validators.required],
      startingClassroom: [data.startingClassroom, Validators.required],
      endingClassroom: [data.endingClassroom, Validators.required],
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

  onStartingFloorSelect(): void {
    const startingFloor = this.form.value.startingFloor;
    console.log(startingFloor.id);
    this.classroomService.getFloorClassrooms(startingFloor.id).subscribe(
      (classrooms: any[]) => {
        console.log('Selected starting floor classrooms:', classrooms);
        this.startingClassroomOptions = classrooms;
        console.log(this.startingClassroomOptions);
      },
      (error: any) => {
        console.error('Error fetching classrooms', error);
      }
    );
  }

  onEndingFloorSelect(): void {
    const endingFloor = this.form.value.endingFloor;
    console.log(endingFloor.id);
    this.classroomService.getFloorClassrooms(endingFloor.id).subscribe(
      (classrooms: any[]) => {
        console.log('Selected ending floor classrooms:', classrooms);
        this.endingClassroomOptions = classrooms;
        console.log(this.endingClassroomOptions);
      },
      (error: any) => {
        console.error('Error fetching classrooms', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    this.getTrajeto();
  }


  getTrajeto(): void {
    if (this.form.valid) {
      const startingClassroom = this.form.value.startingClassroom;
      const endingClassroom = this.form.value.endingClassroom;
      console.log(startingClassroom.id + " " + endingClassroom.id);
      this.planeamentoService.getTrajetoria(startingClassroom.id,endingClassroom.id).subscribe(
        (response: any) => {
          console.log('successfull', response);
          this.trajeto = response;
        },
        (error: any) => {
          console.error('Error', error);
        }
      );
    }
  }




  }


