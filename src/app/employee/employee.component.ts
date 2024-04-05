import { Component, OnChanges, AfterViewInit, OnInit } from '@angular/core';
import { EmployeeServicesService } from './services/employee-services.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  pagesRoutes = [
    { label: 'Dashboard', link: './dashboard', icon: 'dashboard' },
    { label: 'Holidays', link: './holidays', icon: 'event' },
    { label: 'Leaves', link: './applyleave', icon: 'flight_takeoff' },
  ];
  
  loading: boolean = false;
  role: string = "Auth"
  titlename = ""
  Employeeid = ""
  myInfo: any = [];

  constructor(private employeeservices: EmployeeServicesService) {
    const result = this.employeeservices.getEmployeeAPI()
    if (result) {
      this.loading = false;
    }
  }

  ngOnInit(): void {

    const result = this.employeeservices.getLocalDataEmployee()
    this.myInfo = result
    this.titlename = result.first_name + " " + result.last_name
    this.Employeeid = result.id
    console.log("result", result)
  }

}
