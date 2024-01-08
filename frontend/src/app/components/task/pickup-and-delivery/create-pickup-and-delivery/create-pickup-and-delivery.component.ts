import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { ClassroomService } from '../../../../services/classroom.service';

export interface TaskData {
  pickupClassroom: string;
  deliveryClassroom: string;
  pickupContact: string;
  deliveryContact: string;
  confirmationCode: string;
  deliveryDescription: string;
  isPending: boolean;
  isApproved: boolean;
}

@Component({
  selector: 'app-create-pickup-and-delivery',
  templateUrl: './create-pickup-and-delivery.component.html',
  styleUrls: ['./create-pickup-and-delivery.component.scss']
})
export class CreatePickupDeliveryComponent implements OnInit {
  form: FormGroup;
  classroomOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskData,
    public dialogRef: MatDialogRef<CreatePickupDeliveryComponent>,
    private fb: FormBuilder,
    private taskService: TaskService,
    private classroomService: ClassroomService,
  ) {
    this.form = this.fb.group({
      pickupClassroom: [data.pickupClassroom, Validators.required],
      deliveryClassroom: [data.deliveryClassroom, Validators.required],
      pickupContact: [data.pickupContact, Validators.required],
      deliveryContact: [data.deliveryContact, Validators.required],
      confirmationCode: [data.confirmationCode, Validators.required],
      deliveryDescription: [data.deliveryDescription, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClassroomOptions();
  }

  loadClassroomOptions(): void {
    this.classroomService.getClassrooms().subscribe(
      (classrooms: any[]) => {
        this.classroomOptions = classrooms;
      },
      (error: any) => {
        console.error('Error fetching classrooms', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const taskData = {
        pickupClassroom: this.form.value.pickupClassroom,
        deliveryClassroom: this.form.value.deliveryClassroom,
        pickupContact: this.form.value.pickupContact,
        deliveryContact: this.form.value.deliveryContact,
        confirmationCode: this.form.value.confirmationCode,
        deliveryDescription: this.form.value.deliveryDescription,
        isPending: true,
        isApproved: false,
      };

      console.log('Saving pickup-delivery task with data', taskData);

      // Assuming you have a service method to save the data
      this.taskService.createPickupAndDeliveryTask(taskData).subscribe(
        (response: any) => {
          console.log('Pickup-delivery task created successfully', response);
          this.dialogRef.close(taskData);
          // Additional logic if needed
        },
        (error: any) => {
          console.error('Error creating pickup-delivery task', error);
        }
      );
    }
  }
}
