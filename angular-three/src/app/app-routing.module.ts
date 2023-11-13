import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { BuildingComponent } from './building/building.component';
import { FloorComponent } from './floor/floor.component';

const routes: Routes = [
  { path: 'cube', component: CubeComponent },
  { path: 'buildings', component: BuildingComponent},
  {path: 'floors', component: FloorComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
