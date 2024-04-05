import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';
import { EmployeesListComponent } from '../employees-list/employees-list.component';  

interface formdata {

    fname: string | null
    lname: string | null
    pass: string | null
    email: string | null
    contactno: string | null
    designation: string | null
    bloodgrp: string | null
    dob: Date | null
    address: string | null

}


@Component({
  selector: 'app-commonforms',
  templateUrl: './commonforms.component.html',
  styleUrls: ['./commonforms.component.css']
})

export class CommonformsComponent implements OnInit {

  result: string = "";
  error: string = "";
  err: boolean = false;
  maxDate: Date = new Date();
  dateofbirth: string = "";
  @Input() dataSource!: formdata;
  @Input() isEdit!: boolean;
  @Input() empid!: number;
  regform!: FormGroup;
  heading: string = "Add Employee";
  buttonText: string = "Add";


  constructor(
    private apiServices: ApiadminService,
    public dialogRef: MatDialogRef<EmployeesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dataSource: any, isEdit: any, empid: any }
  ) { }

 
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.heading = "Edit Employee";
      this.buttonText = "Save";
    }

    this.regform = new FormGroup({
      fname: new FormControl(this.data.dataSource.fname, [Validators.required]),
      lname: new FormControl(this.data.dataSource.lname, [Validators.required]),
      pass: new FormControl(this.data.dataSource.pass, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.data.dataSource.email, [Validators.required, Validators.email]),
      contactno: new FormControl(this.data.dataSource.contactno, [Validators.required]),
      designation: new FormControl(this.data.dataSource.designation, [Validators.required]),
      bloodgrp: new FormControl(this.data.dataSource.bloodgrp, [Validators.required]),
      dob: new FormControl(this.data.dataSource.dob, [Validators.required]),
      address: new FormControl(this.data.dataSource.address, [Validators.required])

    })

  }

  //converting data into yyyy-mm-dd

  dateformater(date: any) {
    const dobDate = new Date(date);
    const year = dobDate.getFullYear();
    const month = String(dobDate.getMonth() + 1).padStart(2, '0');
    const day = String(dobDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

  onsubmit() {
    if (this.regform.valid) {
      const email = this.regform.value.email;
      const pass = this.regform.value.pass;
      const fname = this.regform.value.fname;
      const lname = this.regform.value.lname;
      const contactno = this.regform.value.contactno;
      const designation = this.regform.value.designation;
      const bloodgrp = this.regform.value.bloodgrp;
      const dob = this.regform.value.dob;
      const dobFormatted = this.dateformater(dob)
     // console.log(dobFormatted)
      const address = this.regform.value.address;

      const body = {
        "first_name": fname,
        "last_name": lname,
        "email": email,
        "password": pass,
        "designation": designation,
        "blood_group": bloodgrp,
        "date_of_birth": dobFormatted,
        "contact_no": contactno,
        "address": address
      }
      
      if (!this.isEdit) {
        console.log(this.isEdit)
        this.apiServices.post('user/register', body).subscribe(
          (data) => {
            this.err = false
            this.result = data
            console.log("result:", this.result)
          },
          (errorobj) => {
            console.log({ message: "Failed", result: errorobj })
            this.err = true
            this.error = errorobj.error.messages[0].message;
            console.log(this.error)
          }
        );
        console.log(JSON.stringify(body));
      }
      else {
        this.apiServices.put(`user/update/${this.data.empid}`, body).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
  }

  clear() {
    this.regform.reset();
  }

  close() {
    this.dialogRef.close();
  }

 

}

 

