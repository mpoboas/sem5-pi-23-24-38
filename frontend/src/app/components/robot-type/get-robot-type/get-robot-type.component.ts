import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RobotTypeService } from '../../../services/robot-type.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-robot-type',
  templateUrl: './get-robot-type.component.html',
  styleUrls: ['./get-robot-type.component.scss']
})
export class GetRobotTypeComponent {
  displayedColumns: string[] = ['designation','brand', 'model', 'tasks'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private robotTypeService: RobotTypeService, private dialog: MatDialog) {}

  ngOnInit() {
    this.robotTypeService.getRobotTypes().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching robotTypes', error);
      }
    );
  }

  ngAfterViewInit() {
    // Set up sorting and pagination after data is loaded
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageSize = 10;
      });
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
