import { Component } from '@angular/core';
import { GetTrajetoriaComponent } from '../get-trajetoria/get-trajetoria.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaneamentoService } from './planeamento.service';

@Component({
  selector: 'app-planeamento',
  templateUrl: './planeamento.component.html',
  styleUrls: ['./planeamento.component.scss']
})
export class PlaneamentoComponent {
  constructor(private planService: PlaneamentoService, private dialog: MatDialog) {}

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
