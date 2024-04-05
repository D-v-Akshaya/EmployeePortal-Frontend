import { Component, OnInit } from '@angular/core';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CommonformsComponent } from '../commonforms/commonforms.component';
interface formdata {

  fname: string | null;
  lname: string | null;
  pass: string | null;
  email: string | null;
  contactno: string | null;
  designation: string | null;
  bloodgrp: string | null;
  dob: Date | null;
  address: string | null;
}


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  EmployeeList: any[] = [];
  ErrorMessage: any = {};
  datasource!: formdata;
  isedit: boolean = false;
  yourDataSource: MatTableDataSource<any>;
  yourDisplayedColumns: string[];
  empid: number = 0;

  studentlistActionButtons = [
    { icon: 'edit', function: (employee: any) => this.editEmployee(employee) },
    { icon: 'delete', function: (employee: any) => this.deleteStudent(employee) },
  ];



  editEmployee(emp: any) {
    this.isedit = true;
    // console.log(emp)
    this.datasource = {
      fname: emp.first_name,
      lname: emp.last_name,
      pass: "",
      email: emp.email,
      contactno: emp.contact_no,
      designation: emp.designation,
      bloodgrp: emp.blood_group,
      dob: emp.date_of_birth,
      address: emp.address
    };
    this.empid = emp.id

    const dialogRef = this.dialog.open(CommonformsComponent, {
      width: '500px', // Set the width as per your requirement
      data: { dataSource: this.datasource, isEdit: this.isedit, empid: this.empid },
    });

    // Listen to dialog's afterClosed event to reset the flag
    dialogRef.afterClosed().subscribe(() => {
      this.getEmployeeData()
    });



  }

  deleteStudent(student: any) {
  }

  constructor(private apiServices: ApiadminService, public dialog: MatDialog) {
    this.yourDataSource = new MatTableDataSource<any>([]);
    this.yourDisplayedColumns = [];

    this.getEmployeeData()
  }


  getEmployeeData() {

    const body = { page_no: 1 }
    this.apiServices.getWithBody('user/list', body).subscribe(
      {
        next: (data: any) => {

          console.log("All data", data)
          const showColumns = ['id', 'email', 'fullname', 'contact_no', 'designation']

          const ModifiedData = data.Employees.map((employee: any) => ({
            ...employee,
            fullname: employee.first_name + ' ' + employee.last_name
          }));


          this.yourDataSource = new MatTableDataSource(ModifiedData);
          this.yourDisplayedColumns = showColumns;
        },
        error: (error: any) => {
          console.log({
            message: "Failed",
            result: error
          })
          return false;
        }
      }
    );
  }
  back() {
    this.isedit = false;
  }


  openAddEmployeeForm() {

    this.isedit = false;
    // console.log(emp)
    this.datasource = {
      fname: "",
      lname: "",
      pass: "",
      email: "",
      contactno:"",
      designation: "",
      bloodgrp:"",
      dob: new Date(),
      address: ""
    };
   

    const dialogRef = this.dialog.open(CommonformsComponent, {
      width: '500px', // Set the width as per your requirement
      data: { dataSource: this.datasource, isEdit: this.isedit, empid: this.empid },
    });

    // Listen to dialog's afterClosed event to reset the flag
    dialogRef.afterClosed().subscribe(() => {
      this.getEmployeeData()
    });


  }
}

