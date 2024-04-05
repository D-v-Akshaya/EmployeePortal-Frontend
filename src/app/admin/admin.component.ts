import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  pagesRoutes = [
    { label: 'Employees', link: './employees-lists', icon: 'group' },
    // { label: 'Employees', link: './employees', icon: 'group' },
    { label: 'Holidays', link: './holidays', icon: 'event' },
    { label: 'Employee Leaves', link: './employees-leaves', icon: 'date_range' },
  ];
  
  loading: boolean = false;
  role: string = "Auth" 
}
