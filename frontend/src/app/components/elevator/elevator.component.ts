import { Component } from '@angular/core';
import { CreateElevatorComponent, ElevatorData } from './create-elevator/create-elevator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent {


 constructor(private dialog: MatDialog){}

  openCreateFloorDialog(): void {
    const dialogRef = this.dialog.open(CreateElevatorComponent, {
      data: { x: '', y: '', buildingId: '' }
    });

    dialogRef.afterClosed().subscribe((result: ElevatorData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Elevator created:', result);
      }
    });
  }


}
