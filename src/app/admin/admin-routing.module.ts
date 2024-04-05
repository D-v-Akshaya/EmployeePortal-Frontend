import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HolidaysComponent } from '../employee/components/holidays/holidays.component';
import { EmployeeLeavesComponent } from './components/employee-leaves/employee-leaves.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AddHolidaysComponent } from './components/add-holidays/add-holidays.component';
import { adminguardGuard } from './guard/adminguard.guard';
import { PagenotfoundComponent } from '../auth/components/pagenotfound/pagenotfound.component';

const routes: Routes = [{
  path: 'admin', canActivate: [adminguardGuard], component: AdminComponent, children: [
    { path: '', redirectTo: 'employees-lists', pathMatch: 'full' },
    { path: 'holidays', component: AddHolidaysComponent },
    // { path: 'employees', component: AddEmployeesComponent },
    { path: 'employees-leaves', component: EmployeeLeavesComponent },
    { path: 'employees-lists', component: EmployeesListComponent },
  ]
},
// { path: '**', pathMatch: 'prefix', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
