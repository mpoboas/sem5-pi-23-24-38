import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { BuildingComponent } from './building/building.component';
import { FloorComponent } from './floor/floor.component';
import { CampusManagerComponent } from './campus-manager/campus-manager.component';
import { RobotTypeComponent } from './robot-type/robot-type.component';
import { FleetManagerComponent } from './fleet-manager/fleet-manager.component';
import { RobotComponent } from './robot/robot.component';
import { TunnelComponent } from './tunnel/tunnel.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'fleet-manager', component: FleetManagerComponent , children: [
    { path: 'robot-type', component: RobotTypeComponent },
    { path: 'robot', component: RobotComponent }
  ]},
  { path: 'campus-manager', component: CampusManagerComponent, children: [
    { path: 'buildings', component: BuildingComponent },
    { path: 'floors', component: FloorComponent },
    { path: 'classrooms', component: ClassroomComponent},
    { path: 'tunnels', component: TunnelComponent },
    { path: 'elevators', component: ElevatorComponent }
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
