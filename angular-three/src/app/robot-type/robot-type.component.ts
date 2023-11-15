import { Component, OnInit } from '@angular/core';
import { RobotTypeService } from './robot-type.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRobotTypeComponent, RobotTypeData } from '../create-robot-type/create-robot-type.component';

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.scss']
})
export class RobotTypeComponent implements OnInit {
  robotTypes: any[] = [];

  constructor(private robotTypeService: RobotTypeService,private dialog: MatDialog) {}

  ngOnInit() {
      this.robotTypeService.getRobotTypes().subscribe(
      (data: any) => {
        this.robotTypes = data;
      },
      (error: any) => {
        console.error('Error fetching robotTypes', error);
      }
    );
  }


  openCreateRobotType(): void {
    const dialogRef = this.dialog.open(CreateRobotTypeComponent, {
      data: {brand: '', model: '', tasks: '' },
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: RobotTypeData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('RobotType created:', result);
      }
    });
  }

}
