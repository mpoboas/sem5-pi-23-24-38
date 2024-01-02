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

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'info-manager', component: InfoManagerComponent, canActivate: [AuthGuard] },
  { path: 'task-manager', component: TaskManagerComponent, canActivate: [AuthGuard] },
  { path: 'admin-manager', component: AdminManagerComponent, canActivate: [AuthGuard], children: [
    { path: 'user-manager', component: UserManagerComponent }
  ]},
  { path: 'fleet-manager', component: FleetManagerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ['ADMIN', 'FLEET_MANAGER'] }, children: [
    { path: 'robot-type', component: RobotTypeComponent },
    { path: 'robot', component: RobotComponent },
    { path: 'planning', component: PlanningComponent }
  ]},
  { path: 'campus-manager', component: CampusManagerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ['ADMIN', 'CAMPUS_MANAGER'] }, children: [
    { path: 'buildings', component: BuildingComponent },
    { path: 'floors', component: FloorComponent },
    { path: 'classrooms', component: ClassroomComponent},
    { path: 'tunnels', component: TunnelComponent },
    { path: 'elevators', component: ElevatorComponent },
    { path: 'animation', component: AnimationComponent}
  ]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
