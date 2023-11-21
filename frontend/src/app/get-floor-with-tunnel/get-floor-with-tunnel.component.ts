
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TunnelService } from '../tunnel/tunnel.service';
import { FloorService } from '../floor/floor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-get-floor-with-tunnel',
  templateUrl: './get-floor-with-tunnel.component.html',
  styleUrls: ['./get-floor-with-tunnel.component.scss']
})
export class GetFloorWithTunnelComponent {
  displayedColumns: string[] = ['floorNumber'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Range,
    public dialogRef: MatDialogRef<GetFloorWithTunnelComponent>,
    private fb: FormBuilder,
    private tunnelService: TunnelService,
    private floorService: FloorService,) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.tunnelService.getFloorsTunnel().subscribe(
      (floor: any) => {
        this.dataSource = new MatTableDataSource(floor);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );

  }



}
