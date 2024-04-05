import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { employeeGuardGuard } from './guard/employee-guard.guard';
import { PagenotfoundComponent } from '../auth/components/pagenotfound/pagenotfound.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { ApplyLeavesComponent } from './components/apply-leaves/apply-leaves.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{
  path: 'employee', canActivate: [employeeGuardGuard], component: EmployeeComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: EmployeeDashboardComponent },
    { path: 'holidays', component: HolidaysComponent },
    { path: 'applyleave', component: MyLeavesComponent },
    {path:'profile',component:ProfileComponent}
    // { path: 'unathorised', component: UnauthorisedComponent },
  ]
},
// { path: '**', pathMatch: 'prefix', component: PagenotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
