import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FloorService } from '../../services/floor.service';
import { CreateFloorComponent, FloorData } from './create-floor/create-floor.component';
import { GetFloorWithTunnelComponent } from './get-floor-with-tunnel/get-floor-with-tunnel.component';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {

  constructor(private floorService: FloorService, private dialog: MatDialog) {}

  openCreateFloorDialog(): void {
    const dialogRef = this.dialog.open(CreateFloorComponent, {
      data: { floorNumber: '', description: '', length: '' , width:'', map:'', buildingId: '' },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: FloorData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Floor created:', result);
      }
    });
  }

  openGetFloorWithTunnelDialog(): void {
    const dialogRef = this.dialog.open(GetFloorWithTunnelComponent, {
      width: '400px',
    });
  }

}
