import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { TunnelService } from '../tunnel.service';
import { MatDialog } from '@angular/material/dialog';
import { FloorService } from '../../../services/floor.service';
import { EditTunnelComponent } from '../edit-tunnel/edit-tunnel.component';

@Component({
  selector: 'app-get-tunnels',
  templateUrl: './get-tunnels.component.html',
  styleUrls: ['./get-tunnels.component.scss']
})
export class GetTunnelsComponent implements OnInit {
  displayedColumns: string[] = ['description', 'floor1Id','location1', 'floor2Id','location2','actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tunnelService: TunnelService,private floorService: FloorService,private dialog: MatDialog) {}

    ngOnInit() {
      this.tunnelService.getTunnels().subscribe(
        (tunnel: any) => {
          this.getFloorNumber(tunnel);
        },
        (error: any) => {
          console.error('Error fetching tunnels', error);
        }
      );
    }

    getFloorNumber(tunnel: any) {
      tunnel.forEach((element: any) => {
        this.floorService.getFloorNum(element.floor1Id).subscribe(
          (floor: any) => {
            element.floor1Id = floor;
          },
          (error: any) => {
            console.error('Error fetching floor', error);
          }
        );
        this.floorService.getFloorNum(element.floor2Id).subscribe(
          (floor: any) => {
            element.floor2Id = floor;
          },
          (error: any) => {
            console.error('Error fetching floor', error);
          }
        );
        this.dataSource = new MatTableDataSource(tunnel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //element.floor2Id = element.floor2Id.number;
      });

    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    ngAfterViewInit() {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.paginator.pageSize = 10;
        });
      }
    }

    editTunnel(tunnel: any) {
      // Open the edit building dialog
      const dialogRef = this.dialog.open(EditTunnelComponent, {
        width: '500px',
        data: tunnel
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Update the building in the database
          this.tunnelService.updateTunnel(result).subscribe(
            (data: any) => {
              // Update the building in the table
              const index = this.dataSource.data.findIndex(b => b.id === data.id);
              this.dataSource.data[index] = data;
              this.dataSource._updateChangeSubscription();
            },
            (error: any) => {
              console.error('Error updating tunnel', error);
            }
          );
        }
      });
    }


}
