import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TunnelService } from './tunnel.service';
import { CreateTunnelComponent, TunnelData } from './create-tunnel/create-tunnel.component';

@Component({
  selector: 'app-tunnel',
  templateUrl: './tunnel.component.html',
  styleUrls: ['./tunnel.component.scss']
})
export class TunnelComponent {

  constructor(private tunnelService: TunnelService, private dialog: MatDialog) {}


  openCreateTunnelDialog(): void {
    const dialogRef = this.dialog.open(CreateTunnelComponent, {
      data: {description: '', floor1Number: '', floor2Number: ''},
    });

    dialogRef.afterClosed().subscribe((result: TunnelData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Tunnel created:', result);
      }
    });
  }
}
