import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { BuildingComponent } from './building/building.component';
import { GetBuildingsComponent } from './get-buildings/get-buildings.component';

const routes: Routes = [
  {path: 'cube', component: CubeComponent },
  {path: 'buildings', component: BuildingComponent },
  {path: 'get-buildings', component: GetBuildingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
