import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { PlaneamentoComponent } from './planeamento/planeamento.component';
import { AnimationComponent } from './animation/animation.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
//import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  //{ path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'info-manager', component: InfoManagerComponent, canActivate: [AuthGuard] },
  { path: 'task-manager', component: TaskManagerComponent, canActivate: [AuthGuard] },
  { path: 'admin-manager', component: AdminManagerComponent, canActivate: [AuthGuard], children: [
    { path: 'user-manager', component: UserManagerComponent }
  ]},
  { path: 'fleet-manager', component: FleetManagerComponent, canActivate: [AuthGuard], children: [
    { path: 'robot-type', component: RobotTypeComponent },
    { path: 'robot', component: RobotComponent },
    { path: 'planning', component: PlaneamentoComponent }
  ]},
  { path: 'campus-manager', component: CampusManagerComponent, canActivate: [AuthGuard], children: [
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
