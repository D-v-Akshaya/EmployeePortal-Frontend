import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css']
})
export class EmployeeLeavesComponent {

  LeaveList: any[] = [];
  ErrorMessage: any = {};

  yourDataSource: MatTableDataSource<any>;
  yourDisplayedColumns: string[];

  studentlistActionButtons = [
    { icon: 'check_circle', function: (leave: any) => this.approveleave(leave) },
    { icon: 'cancel', function: (leave: any) => this.rejectleave(leave) },
  ];


  constructor(private apiServices: ApiadminService,private snackbar:MatSnackBar) {
    this.yourDataSource = new MatTableDataSource<any>([]);
    this.yourDisplayedColumns = [];

    this.getleaveData()
  }


  getleaveData() {
    this.apiServices.get('leaves/admin').subscribe(
      (data) => {
   
        const showColumns = ['employee_id', 'employee__first_name', 'employee__last_name', 'from_date', 'till_date', 'leave_type', 'no_of_days', 'reason']
        this.LeaveList = data.Leaves       
        this.yourDataSource = new MatTableDataSource(data.Leaves);
        this.yourDisplayedColumns = showColumns;
      },
      (error) => {
        console.log({
          message: "Failed",
          result: error
        })
       
      }
    );
  }

  openSnackBar(message: string,action:any) {
    let snackBarRef = this.snackbar.open(message,action,{
      duration: 3000,  
       horizontalPosition: 'center', // Center horizontally
      verticalPosition: 'top', // Align to the bottom
      panelClass: 'centered-snackbar'
    });
    snackBarRef.onAction().subscribe(() => {
    //  console.log('The snackbar action was triggered!');
    }); 
  }

  approveleave(leave: any) {
    const body = {
      leave_id:leave.id ,
      status: "Approved"
  }
    this.putapicalling(body)
  }

  rejectleave(leave: any) {
    const body = {
      leave_id: leave.id,
      status: "Rejected"
    }
    this.putapicalling(body)
  }

  putapicalling(body:any){
  this.apiServices.put('leaves/admin',JSON.stringify(body)).subscribe(
    (response) => {
      console.log("1",response)
      this.getleaveData()
    },
    (error) => {
      console.log("2",error)
    }
  )
}

}
