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
import { VisualizationComponent } from './visualization/visualization.component';
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { PlaneamentoComponent } from './planeamento/planeamento.component';
import { AnimationComponent } from './animation/animation.component';
const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'info-manager', component: InfoManagerComponent },
  { path: 'task-manager', component: AdminManagerComponent },
  { path: 'admin-manager', component: TaskManagerComponent },
  { path: 'fleet-manager', component: FleetManagerComponent , children: [
    { path: 'robot-type', component: RobotTypeComponent },
    { path: 'robot', component: RobotComponent },
    { path: 'planning', component: PlaneamentoComponent }
  ]},
  { path: 'campus-manager', component: CampusManagerComponent, children: [
    { path: 'buildings', component: BuildingComponent },
    { path: 'floors', component: FloorComponent },
    { path: 'classrooms', component: ClassroomComponent},
    { path: 'tunnels', component: TunnelComponent },
    { path: 'elevators', component: ElevatorComponent },
    { path: 'visualization', component: VisualizationComponent },
    { path: 'animation', component: AnimationComponent}
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
