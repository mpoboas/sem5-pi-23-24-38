  import { Component } from '@angular/core';
  import { OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatTableDataSource } from '@angular/material/table'
  import { MatSort } from '@angular/material/sort';
  import { TunnelService } from '../tunnel/tunnel.service';
  import { MatDialog } from '@angular/material/dialog';
  import { FloorService } from '../floor/floor.service';

  @Component({
    selector: 'app-get-tunnels',
    templateUrl: './get-tunnels.component.html',
    styleUrls: ['./get-tunnels.component.scss']
  })
  export class GetTunnelsDialogComponent implements OnInit {
  displayedColumns: string[] = ['description', 'floor1Id', 'floor2Id'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tunnelService: TunnelService,private floorServise: FloorService) {}

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
        this.floorServise.getFloorNum(element.floor1Id).subscribe(
          (floor: any) => {
            element.floor1Id = floor;
          },
          (error: any) => {
            console.error('Error fetching floor', error);
          }
        );
        this.floorServise.getFloorNum(element.floor2Id).subscribe(
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
        this.paginator.pageSize = 10;
      }
    }
  }
