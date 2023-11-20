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
      const tunnelData = this.form.value;
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
