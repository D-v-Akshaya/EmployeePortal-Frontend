import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { ApplyLeavesComponent } from './components/apply-leaves/apply-leaves.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialog  } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ProfileComponent } from './components/profile/profile.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    EmployeeComponent,
    MyLeavesComponent,
    ApplyLeavesComponent,
    HolidaysComponent,
    EmployeeDashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    SharedModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule
  ]
})
export class EmployeeModule { }
