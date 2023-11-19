import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from './data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'password', 'active', 'created_at', 'updated_at', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit() {
    this.loadRooms();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadRooms() {
    this.dataService.getRooms().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.data

        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 2000,
        });
      },
      error: (response: any) => {
        console.error('Error loading rooms:', response);

        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 6000,
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRooms();
      }
    });
  }

  openEditDialog(id: number): void {
    let room: any = {
      nombre: '',
      password: '',
    }

    this.dataService.getRoomsById(id).subscribe({
      next: (response: any) => {
        room = response.data
        console.log(room);

        const dialogRef = this.dialog.open(UpdateDialogComponent, {
          width: '300px',
          data: room
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadRooms();
          }
        });
      },
      error: (response: any) => {
        console.error('Error loading rooms:', response);

        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 6000,
        });
      }
    });
  }

  deleteRoom(id: number): void {
    this.dataService.deleteRoom(id).subscribe({
      next: (response: any) => {
        this.snackBar.open(`${response.status}: ${response.message}`, undefined, {
          duration: 2000,
        });
        this.loadRooms();
      },
      error: (response: any) => {
        console.error('Error deleting room:', response);
        this.snackBar.open(`${response.error.status}: ${response.error.message}`, undefined, {
          duration: 6000,
        });
      }
    });
  }
}