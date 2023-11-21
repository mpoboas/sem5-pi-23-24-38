import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RobotService } from './robot.service';
import { CreateRobotComponent, RobotData } from '../create-robot/create-robot.component';


@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit{
  robots: any[] = [];

  constructor(private robotService: RobotService, private dialog: MatDialog) {}

  ngOnInit() {
    this.robotService.getRobots().subscribe(
      (data: any) => {
        this.robots = data;
      },
      (error: any) => {
        console.error('Error fetching robots', error);
      }
    );
  }


  openCreateRobot(): void {
    const dialogRef = this.dialog.open(CreateRobotComponent, {
      data: { nickname: '', serialNr: '', description: '', isActive: '', robotTypeId: ''},
      width: '400px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result: RobotData) => {
      if (result) {
        // Handle the data returned from the dialog (e.g., save it to your service)
        console.log('Robot created:', result);
      }
    });
  }



}