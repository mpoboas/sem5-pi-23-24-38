import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CubeComponent } from './cube/cube.component';
import { BuildingComponent } from './components/building/building.component';
import { FloorComponent } from './components/floor/floor.component';
import { CampusManagerComponent } from './components/managers/campus-manager/campus-manager.component';
import { RobotTypeComponent } from './components/robot-type/robot-type.component';
import { FleetManagerComponent } from './components/managers/fleet-manager/fleet-manager.component';
import { RobotComponent } from './components/robot/robot.component';
import { TunnelComponent } from './components/tunnel/tunnel.component';
import { ElevatorComponent } from './components/elevator/elevator.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { InfoManagerComponent } from './components/managers/info-manager/info-manager.component';
import { AdminManagerComponent } from './components/managers/admin-manager/admin-manager.component';
import { TaskManagerComponent } from './components/managers/task-manager/task-manager.component';
import { PlanningComponent } from './components/planning/planning.component';
import { AnimationComponent } from './animation/animation.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserManagerComponent } from './components/managers/user-manager/user-manager.component';
import { PickupAndDeliveryComponent } from './components/task/pickup-and-delivery/pickup-and-delivery.component';
import { SurveillanceComponent } from './components/task/surveillance/surveillance.component';

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'info-manager', component: InfoManagerComponent, canActivate: [AuthGuard] },
  { path: 'task-manager', component: TaskManagerComponent, canActivate: [AuthGuard], canActivateChild: [RoleGuard], children: [
    { path: 'pickup-and-delivery', component: PickupAndDeliveryComponent, data: { expectedRoles: ['ADMIN', 'TASK_MANAGER', 'TEACHER', 'STUDENT', 'USER'] } },
    { path: 'surveillance', component: SurveillanceComponent, data: { expectedRoles: ['ADMIN', 'TASK_MANAGER', 'TEACHER', 'STUDENT', 'USER'] } },
  ]},
  { path: 'admin-manager', component: AdminManagerComponent, canActivate: [AuthGuard], canActivateChild: [RoleGuard], children: [
    { path: 'user-manager', component: UserManagerComponent, data: { expectedRoles: ['ADMIN'] } },
  ]},
  { path: 'fleet-manager', component: FleetManagerComponent, canActivate: [AuthGuard], canActivateChild: [RoleGuard], children: [
    { path: 'robot-type', component: RobotTypeComponent, data: { expectedRoles: ['ADMIN','FLEET_MANAGER'] } },
    { path: 'robot', component: RobotComponent, data: { expectedRoles: ['ADMIN','FLEET_MANAGER'] } },
    { path: 'planning', component: PlanningComponent, data: { expectedRoles: ['ADMIN','FLEET_MANAGER'] } },
  ]},
  {
    path: 'campus-manager',
    component: CampusManagerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard], 
    children: [
      { path: 'buildings', component: BuildingComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] } },
      { path: 'floors', component: FloorComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] } },
      { path: 'classrooms', component: ClassroomComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] } },
      { path: 'tunnels', component: TunnelComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] } },
      { path: 'elevators', component: ElevatorComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] } },
      { path: 'animation', component: AnimationComponent, data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER', 'TEACHER', 'STUDENT', 'USER'] } },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
