import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TunnelService } from '../tunnel/tunnel.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FloorService } from '../floor/floor.service';


export interface TunnelData {
  description: string;
  floor1Number: string;
  floor2Number: string;
}

@Component({
  selector: 'app-create-tunnel-dialog',
  templateUrl: './create-tunnel-dialog.component.html',
  styleUrls: ['./create-tunnel-dialog.component.scss']
})
export class CreateTunnelDialogComponent implements OnInit {
  form: FormGroup;
  floorOptions: any[] = [];
  selectedFloorId: string | null = null;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TunnelData,
    public dialogRef: MatDialogRef<CreateTunnelDialogComponent>,
    private fb: FormBuilder,
    private tunnelService: TunnelService,
    private floorService: FloorService,
  ) {
    this.form = this.fb.group({
      description: [data.description, Validators.required],
      floor1Number: [data.floor1Number, Validators.required],
      floor2Number: [data.floor2Number, Validators.required],
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
        description: this.form.value.description,
        floor1Id: null,
        floor2Id: null,
      }

      const floor1Number = this.form.value.floor1Number;
      const floor2Number = this.form.value.floor2Number;
      
      // Call the createBuilding method from your BuildingService
      this.floorService.findFloorByNumber(floor1Number).subscribe(
        (floor: any) => {
          tunnelData.floor1Id = floor ? floor.id : null;
          this.floorService.findFloorByNumber(floor2Number).subscribe(
            (floor: any) => {
              tunnelData.floor2Id = floor ? floor.id : null;
              this.tunnelService.createTunnel(tunnelData).subscribe(
                (response: any) => {
                  console.log('Tunnel created successfully', response);
                  this.dialogRef.close(tunnelData);
                  window.location.reload();
                },
                (error: any) => {
                  console.error('Error creating tunnel', error);
                }
              );
            },
            (error: any) => {
              console.error('Error finding floor by number', error);
            }
          );
        },
        (error: any) => {
          console.error('Error finding floor by number', error);
        }
      );
    }
  }

}
