import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePickupDeliveryComponent, TaskData } from './create-pickup-and-delivery/create-pickup-and-delivery.component';

@Component({
  selector: 'app-pickup-and-delivery',
  templateUrl: './pickup-and-delivery.component.html',
  styleUrls: ['./pickup-and-delivery.component.scss']
})
export class PickupAndDeliveryComponent {

  constructor(private dialog: MatDialog) {}

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreatePickupDeliveryComponent, {
      data: { },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: TaskData) => {
      if (result) {
        console.log('Task created:', result);
      }
    });
  }

}
