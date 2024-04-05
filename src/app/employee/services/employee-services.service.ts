import { Injectable } from '@angular/core';
import { ApiadminService } from '../../api/admin/apiadmin.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  constructor(private apiservices: ApiadminService) { }
  getEmployeeAPI():any {
    this.apiservices.get('user/details').subscribe({
      next: (data: any) => {
        console.log(data)
        localStorage.setItem('employeeData', JSON.stringify(data.Employee));
        return true
      },
      error: (error: any) => {
        console.log("Error for user/details", error);
        return false;
      }
    });
  }

  getLocalDataEmployee():any{
   this.getEmployeeAPI()
    const data: any = localStorage.getItem('employeeData')
    const JSONdata = JSON.parse(data);

    return JSONdata[0]
  
  }
}
