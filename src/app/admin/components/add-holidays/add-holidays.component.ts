import { DialogRef } from '@angular/cdk/dialog';
import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';


@Component({
  selector: 'app-add-holidays',
  templateUrl: './add-holidays.component.html',
  styleUrls: ['./add-holidays.component.css'],


})
export class AddHolidaysComponent implements OnInit {
  @ViewChild('addHolidayDialog') addHolidayDialog!: TemplateRef<any>;

  HolidayList: any[] = [];
  result: string = "";
  yourDataSource: MatTableDataSource<any>;
  yourDisplayedColumns: string[];

  selectedDate: Date = new Date(); // Initial selected date

  constructor(private apiServices: ApiadminService,
    public dialog: MatDialog, private fb: FormBuilder) {

    this.yourDataSource = new MatTableDataSource<any>([]);
    this.yourDisplayedColumns = [];

  }
  ngOnInit(): void {
    this.getHolidays();
  }

  holidayActionButtons = [
    { icon: 'delete', function: (employee: any) => this.deleteHoliday(employee) },
  ];

  getHolidays() {
    //call API to get all holidays data of year.
    this.apiServices.get('holidays/').subscribe({
      next: (data) => {
        const showColumns = ['date', 'day', 'holiday_name'];
        this.yourDataSource = new MatTableDataSource(data.Holidays);
        this.yourDisplayedColumns = showColumns;
      },
      error: (error) => {
        console.log("holidays :", error)
      }
    })

  }

  deleteHoliday(holiday: any) {
    const body = {
      "id": `${holiday.id}`
    }
    console.log(JSON.stringify(body))
    this.apiServices.delete(`holidays/delete/${holiday.id}`).subscribe(
      (response) => {
        // console.log(response)
        // alert("deleted suceefully...");
        this.getHolidays();
      },
      (error) => {
        console.log("Erro ", error)
      }
    )
  }


  Holiday_Name: any = '';// To store the entered holiday name

  //open add holiday form as 
  openAddHolidayForm() {
    const dialogRef = this.dialog.open(this.addHolidayDialog, {
      width: '400px', // Set the width as per your requirement

    });

    // Listen to dialog's afterClosed event to reset the flag
    dialogRef.afterClosed().subscribe(() => {
        this.getHolidays()
    });


  }
  close() {

  }

  //add new holiday

  saveHoliday(): void {
    // alert(this.Holiday_Name);

    const body = {
      "holiday_name": this.Holiday_Name,
      "date": formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US'),
      "day": this.selectedDate.toLocaleDateString('en-US', { weekday: 'long' })
    }
    this.apiServices.post(`holidays/add`, body).subscribe(
      (response) => {
       // console.log(response)
      },
      (error) => {
        console.log("Erro ", error)
      }
    )

  }
}
