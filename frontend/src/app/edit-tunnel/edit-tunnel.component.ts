import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TunnelService } from '../tunnel/tunnel.service';
import { Location } from '@angular/common';
import { FloorService } from '../floor/floor.service';



export interface TunnelData {
  id: string;
  description: string;
  floor1Id: string;
  floor2Id: string;
  location1: number[]; // Coordinates for Location 1
  location2: number[]; // Coordinates for Location 2
}


@Component({
  selector: 'app-edit-tunnel',
  templateUrl: './edit-tunnel.component.html',
  styleUrls: ['./edit-tunnel.component.scss']
})
export class EditTunnelComponent {
  form: FormGroup;
  floorOptions: any[] = [];
  selectedFloorId: string | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TunnelData,
    public dialogRef: MatDialogRef<EditTunnelComponent>,
    private fb: FormBuilder,
    private tunnelService: TunnelService,
    private floorService: FloorService,
    private location: Location,) {
      this.form = this.fb.group({
        id: [data.id, Validators.required],
        description: [data.description],
        floor1Id: [data.floor1Id],
        floor2Id: [data.floor2Id],
        location1x: [data.location1[0]], // Location 1 x coordinate
        location1y: [data.location1[1]], // Location 1 y coordinate
        location2x: [data.location2[0]], // Location 2 x coordinate
        location2y: [data.location2[1]], // Location 2 y coordinate
      });

    }

    ngOnInit(): void {
      this.loadFloorOptions();
    }
  
    loadFloorOptions(): void {
      this.floorService.getFloors().subscribe(
        (floors: any[]) => {
          this.floorOptions = floors;
        },
        (error: any) => {
          console.error('Error fetching floors', error);
        }
      );
    }
  


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const tunnelData = {
        id: this.form.value.id,
        description: this.form.value.description,
        floor1Id: this.form.value.floor1Id,
        floor2Id: this.form.value.floor2Id,
        location1: [this.form.value.location1x, this.form.value.location1y], // Location 1 coordinates
        location2: [this.form.value.location2x, this.form.value.location2y], // Location 2 coordinates
      };
      console.log(tunnelData);
      this.floorService.findFloorByNumber(tunnelData.floor1Id).subscribe(
        (floor: any) => {
          tunnelData.floor1Id = floor.id;
  

          this.floorService.findFloorByNumber(tunnelData.floor2Id).subscribe(
            (floor: any) => {
              tunnelData.floor2Id = floor.id;
             
                    // Call the updateBuilding method from your TunnelService
              this.tunnelService.updateTunnel(tunnelData).subscribe(
                (response: any) => {
                  console.log('Tunnel updated successfully', response);
                  this.dialogRef.close(tunnelData);
                  window.location.reload();
                },
                (error: any) => {
                  console.error('Error updating tunnel', error);
                }
              );

            },
            (error: any) => {
              console.error('Error fetching floor', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching floor', error);
        }
      );
      


    }
  }

}
