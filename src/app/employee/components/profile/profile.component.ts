import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
emp_id:number=0;
first_name:string="";
last_name:string="";
address:string="";
blood_group:string="";
email:string="";
contact_no:string="";
date_of_birth:string="";
designation:string="";
constructor(){
  const storedEmployeeData = localStorage.getItem('employeeData');

if (storedEmployeeData !== null) {
  try {
    const employeeDataarr = JSON.parse(storedEmployeeData);
const employeeData=employeeDataarr[0]
    console.log(employeeData);
    this.emp_id=employeeData.id;
    this.first_name=employeeData.first_name;
    this.last_name=employeeData.last_name;
    this.email=employeeData.email;
    this.address=employeeData.address;
    this.blood_group=employeeData.blood_group;
    this.contact_no=employeeData.contact_no;
    this.date_of_birth=employeeData.date_of_birth;
    this.designation=employeeData.designation;

  } catch (error) {
    console.error('Error parsing stored data:', error);
  }
} else {
  console.log('No employee data found in localStorage.');
}

}
}