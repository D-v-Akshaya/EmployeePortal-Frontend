import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApplyLeavesComponent } from '../apply-leaves/apply-leaves.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent {
  yourDataSource: MatTableDataSource<any>;
  yourDisplayedColumns: any[];
  totalLeaves: number = 0;
  page: number = 1;
  dataLength: number = 0;
  loading :boolean = true;
  constructor(private api: ApiadminService, private dialog: MatDialog) {
    this.yourDataSource = new MatTableDataSource<any>([]);
    this.yourDisplayedColumns = [];
    const showColumns = ['leave_type', 'from_date', 'till_date', 'no_of_days', 'reason', 'status']
    this.yourDisplayedColumns = showColumns;
    this.loading = false
    this.getleaves();
  }

  getleaves() {

    this.api.get(`leaves/?page=${this.page}`).subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.dataLength = data.Leaves.length;
          this.totalLeaves=data.pagination_data.total_leaves
          this.yourDataSource = new MatTableDataSource(data.Leaves);
          this.loading = false
        },
        error: (error: any) => {
          this.loading = false
          console.log({
            message: "Failed",
            result: error
          })
          //return false;
       
        }
      }
    );
  }

  openadd() {
    console.log("opendialog")
    const dialogRef = this.dialog.open(ApplyLeavesComponent, {
      width: '50%'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getleaves()
    });
  }
  pageChanged(event: PageEvent) {
    this.page = event.pageIndex + 1; // Adding 1 since pageIndex is 0-based
    const pageSize = event.pageSize;
    console.log(`Selected page: ${this.page}, Page size: ${pageSize}`);
    this.getleaves()
  }

}
