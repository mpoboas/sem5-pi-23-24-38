import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FloorService } from './floor.service';
import { CreateFloorComponent, FloorData } from '../create-floor/create-floor.component';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {

  constructor(private floorService: FloorService, private dialog: MatDialog) {}

  openCreateFloorDialog(): void {
    const dialogRef = this.dialog.open(CreateFloorComponent, {
      data: { floorNumber: '', description: '', length: '' , width:'', buildingId: '' },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: FloorData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Floor created:', result);
      }
    });
  }

}
