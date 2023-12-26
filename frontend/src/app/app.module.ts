/* COMPONENTS */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
/* Building components */
import { BuildingComponent } from './building/building.component';
import { CreateBuildingDialogComponent } from './create-building-dialog/create-building-dialog.component';
import { EditBuildingDialogComponent } from './edit-building-dialog/edit-building-dialog.component';
import { GetBuildingsComponent } from './get-buildings/get-buildings.component';
import { GetBuildingByMinmaxFloorsDialogComponent } from './get-building-by-minmax-floors-dialog/get-building-by-minmax-floors-dialog.component';

/*Floor components */
import { CreateFloorComponent } from './create-floor/create-floor.component';
import { FloorComponent } from './floor/floor.component';

/* SERVICES */
import { BuildingService } from './building/building.service';
import { FloorService } from './floor/floor.service';

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
import { UploadComponent } from './upload/upload.component';
import { ConfirmationDialogComponent } from './upload/confirmation-dialog/confirmation-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CampusManagerComponent } from './campus-manager/campus-manager.component';
import { GetFloorsComponent } from './get-floors/get-floors.component';
import { FleetManagerComponent } from './fleet-manager/fleet-manager.component';
import { GetRobotTypeComponent } from './get-robot-type/get-robot-type.component';
import { RobotTypeComponent } from './robot-type/robot-type.component';
import { RobotTypeService } from './robot-type/robot-type.service';
import { CreateRobotTypeComponent } from './create-robot-type/create-robot-type.component';
import { RobotComponent } from './robot/robot.component';
import { GetRobotsComponent } from './get-robots/get-robots.component';
import { CreateRobotComponent } from './create-robot/create-robot.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RobotService } from './robot/robot.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TunnelComponent } from './tunnel/tunnel.component';
import { CreateTunnelDialogComponent } from './create-tunnel-dialog/create-tunnel-dialog.component';
import { TunnelService } from './tunnel/tunnel.service';
import { GetTunnelsComponent } from './get-tunnels/get-tunnels.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { CreateElevatorComponent } from './create-elevator/create-elevator.component';
import { ElevatorService } from './elevator/elevator.service';
import { GetElevatorsComponent } from './get-elevators/get-elevators.component';
import { EditTunnelComponent } from './edit-tunnel/edit-tunnel.component';
import { EditFloorComponent } from './edit-floor/edit-floor.component';
import { EditElevatorComponent } from './edit-elevator/edit-elevator.component';
import { GetFloorWithTunnelComponent } from './get-floor-with-tunnel/get-floor-with-tunnel.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { GetClassroomComponent } from './get-classroom/get-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { PlaneamentoComponent } from './planeamento/planeamento.component';
import { GetTrajetoriaComponent } from './get-trajetoria/get-trajetoria.component';
import { PlaneamentoService } from './planeamento/planeamento.service';
import { AnimationComponent } from './animation/animation.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AnimationComponentDialog } from './animation/animation.component';


@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    BuildingComponent,
    GetBuildingsComponent,
    CreateBuildingDialogComponent,
    EditBuildingDialogComponent,
    UploadComponent,
    ConfirmationDialogComponent,
    CreateFloorComponent,
    FloorComponent,
    GetFloorsComponent,
    CampusManagerComponent,
    GetBuildingByMinmaxFloorsDialogComponent,
    FleetManagerComponent,
    GetRobotTypeComponent,
    RobotTypeComponent,
    CreateRobotTypeComponent,
    RobotComponent,
    GetRobotsComponent,
    CreateRobotComponent,
    TunnelComponent,
    CreateTunnelDialogComponent,
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
    VisualizationComponent,
    InfoManagerComponent,
    AdminManagerComponent,
    TaskManagerComponent,
    PlaneamentoComponent,
    GetTrajetoriaComponent,
    AnimationComponent,
    SignupComponent,
    SigninComponent
    AnimationComponent,
    AnimationComponentDialog
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
  ],
  providers: [BuildingService , FloorService, RobotTypeService, RobotService, TunnelService, ElevatorService, PlaneamentoService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
