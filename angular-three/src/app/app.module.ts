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
    CreateTunnelDialogComponent
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
  providers: [BuildingService , FloorService, RobotTypeService, RobotService, TunnelService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
