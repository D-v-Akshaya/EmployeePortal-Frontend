import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit{

  yourDataSource: MatTableDataSource<any>;
  yourDisplayedColumns: any[];
 
 constructor(private api :ApiadminService){
  this.yourDataSource = new MatTableDataSource<any>([]);
  this.yourDisplayedColumns = [];
 }

  ngOnInit(): void {
    this.getHolidays();
  }


  getHolidays() {
    //call API to get all holidays data of year.
    this.api.get('holidays/').subscribe({
     next:(data)=>{
        console.log("holidays :",data);
        const showColumns = ['date', 'day','holiday_name'];

        this.yourDataSource = new MatTableDataSource(data.Holidays);
        this.yourDisplayedColumns = showColumns;
      },
     error: (error)=>{
      console.log("holidays :",error)
      }
  })

  }

  
}

