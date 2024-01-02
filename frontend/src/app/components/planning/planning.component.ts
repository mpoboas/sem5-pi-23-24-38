import { Component } from '@angular/core';
import { GetTrajetoriaComponent } from './get-trajetoria/get-trajetoria.component';
import { MatDialog } from '@angular/material/dialog';
import { PlanningService } from '../../services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {
  constructor(private planService: PlanningService, private dialog: MatDialog) {}

  openGetTrajetoriaDialog(): void {
    const dialogRef = this.dialog.open(GetTrajetoriaComponent, {
      data :{piso1: '',piso2: ''}
    });

    dialogRef.afterClosed().subscribe((result: JSON) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Trajetória:', result);
      }
    });
  }
}
