/* COMPONENTS */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
/* Building components */
import { BuildingComponent } from './components/building/building.component';
import { CreateBuildingComponent } from './components/building/create-building/create-building.component';
import { EditBuildingComponent } from './components/building/edit-building/edit-building.component';
import { GetBuildingsComponent } from './components/building/get-buildings/get-buildings.component';
import { GetBuildingsByRangeComponent } from './components/building/get-buildings-by-range/get-buildings-by-range.component';

/*Floor components */
import { CreateFloorComponent } from './components/floor/create-floor/create-floor.component';
import { FloorComponent } from './components/floor/floor.component';

/* SERVICES */
import { BuildingService } from './services/building.service';
import { FloorService } from './services/floor.service';

/* MODULES */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
/* Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UploadComponent } from './upload/upload.component';
import { ConfirmationDialogComponent } from './upload/confirmation-dialog/confirmation-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CampusManagerComponent } from './components/managers/campus-manager/campus-manager.component';
import { GetFloorsComponent } from './components/floor/get-floors/get-floors.component';
import { FleetManagerComponent } from './components/managers/fleet-manager/fleet-manager.component';
import { GetRobotTypeComponent } from './components/robot-type/get-robot-type/get-robot-type.component';
import { RobotTypeComponent } from './components/robot-type/robot-type.component';
import { RobotTypeService } from './services/robot-type.service';
import { CreateRobotTypeComponent } from './components/robot-type/create-robot-type/create-robot-type.component';
import { RobotComponent } from './components/robot/robot.component';
import { GetRobotsComponent } from './components/robot/get-robots/get-robots.component';
import { CreateRobotComponent } from './components/robot/create-robot/create-robot.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RobotService } from './services/robot.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TunnelComponent } from './components/tunnel/tunnel.component';
import { CreateTunnelComponent } from './components/tunnel/create-tunnel/create-tunnel.component';
import { TunnelService } from './components/tunnel/tunnel.service';
import { GetTunnelsComponent } from './components/tunnel/get-tunnels/get-tunnels.component';
import { ElevatorComponent } from './components/elevator/elevator.component';
import { CreateElevatorComponent } from './components/elevator/create-elevator/create-elevator.component';
import { ElevatorService } from './services/elevator.service';
import { GetElevatorsComponent } from './components/elevator/get-elevators/get-elevators.component';
import { EditTunnelComponent } from './components/tunnel/edit-tunnel/edit-tunnel.component';
import { EditFloorComponent } from './components/floor/edit-floor/edit-floor.component';
import { EditElevatorComponent } from './components/elevator/edit-elevator/edit-elevator.component';
import { GetFloorWithTunnelComponent } from './components/floor/get-floor-with-tunnel/get-floor-with-tunnel.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { CreateClassroomComponent } from './components/classroom/create-classroom/create-classroom.component';
import { GetClassroomComponent } from './components/classroom/get-classroom/get-classroom.component';
import { EditClassroomComponent } from './components/classroom/edit-classroom/edit-classroom.component';
import { InfoManagerComponent } from './components/managers/info-manager/info-manager.component';
import { AdminManagerComponent } from './components/managers/admin-manager/admin-manager.component';
import { TaskManagerComponent } from './components/managers/task-manager/task-manager.component';
import { PlanningComponent } from './components/planning/planning.component';
import { GetTrajetoriaComponent } from './components/planning/get-trajetoria/get-trajetoria.component';
import { PlanningService } from './services/planning.service';
import { AnimationComponent } from './animation/animation.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AnimationComponentDialog } from './animation/animation.component';
import { AuthService } from './services/auth.service';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserManagerComponent } from './components/managers/user-manager/user-manager.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { GetUsersComponent } from './components/user/get-users/get-users.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AnimationComponentDialogAuto } from './animation/animation.component';
import { TermsConditionsComponent } from './components/auth/terms-conditions/terms-conditions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickupAndDeliveryComponent } from './components/task/pickup-and-delivery/pickup-and-delivery.component';
import { TaskService } from './services/task.service';
import { SurveillanceComponent } from './components/task/surveillance/surveillance.component';
import { GetPickupAndDeliveryComponent } from './components/task/pickup-and-delivery/get-pickup-and-delivery/get-pickup-and-delivery.component';
import { GetSurveillanceComponent } from './components/task/surveillance/get-surveillance/get-surveillance.component';
import { CreatePickupDeliveryComponent } from './components/task/pickup-and-delivery/create-pickup-and-delivery/create-pickup-and-delivery.component';
import { CreateSurveillanceComponent } from './components/task/surveillance/create-surveillance/create-surveillance.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    BuildingComponent,
    GetBuildingsComponent,
    CreateBuildingComponent,
    EditBuildingComponent,
    UploadComponent,
    ConfirmationDialogComponent,
    CreateFloorComponent,
    FloorComponent,
    GetFloorsComponent,
    CampusManagerComponent,
    GetBuildingsByRangeComponent,
    FleetManagerComponent,
    GetRobotTypeComponent,
    RobotTypeComponent,
    CreateRobotTypeComponent,
    RobotComponent,
    GetRobotsComponent,
    CreateRobotComponent,
    TunnelComponent,
    CreateTunnelComponent,
    GetTunnelsComponent,
    ElevatorComponent,
    CreateElevatorComponent,
    GetElevatorsComponent,
    EditTunnelComponent,
    EditFloorComponent,
    EditElevatorComponent,
    GetFloorWithTunnelComponent,
    ClassroomComponent,
    CreateClassroomComponent,
    GetClassroomComponent,
    EditClassroomComponent,
    InfoManagerComponent,
    AdminManagerComponent,
    TaskManagerComponent,
    AnimationComponent,
    SignupComponent,
    SigninComponent,
    AnimationComponent,
    AnimationComponentDialog,
    UserManagerComponent,
    CreateUserComponent,
    GetUsersComponent,
    UserProfileComponent,
    UserManagerComponent,
    EditUserComponent,
    AnimationComponentDialogAuto,
    TermsConditionsComponent,
    PlanningComponent,
    GetTrajetoriaComponent,
    PickupAndDeliveryComponent,
    SurveillanceComponent,
    GetPickupAndDeliveryComponent,
    GetSurveillanceComponent,
    CreatePickupDeliveryComponent,
    CreateSurveillanceComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  providers: [BuildingService , FloorService, RobotTypeService, RobotService, TunnelService, ElevatorService, PlanningService, TaskService, AuthService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
