import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { TunnelService } from '../tunnel/tunnel.service';
import { MatDialog } from '@angular/material/dialog';

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

 constructor(private tunnelService: TunnelService) {}

  ngOnInit() {
    this.tunnelService.getTunnels().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      },
      (error: any) => {
        console.error('Error fetching tunnels', error);
      }
    );
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
