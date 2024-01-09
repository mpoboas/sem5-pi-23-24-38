import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSurveillanceComponent, SurveillanceTaskData } from './create-surveillance/create-surveillance.component';

@Component({
  selector: 'app-surveillance',
  templateUrl: './surveillance.component.html',
  styleUrls: ['./surveillance.component.scss']
})
export class SurveillanceComponent {
  constructor(private dialog: MatDialog) {}

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateSurveillanceComponent, {
      data: { },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SurveillanceTaskData) => {
      if (result) {
        console.log('Task created:', result);
      }
    });
  }
}
