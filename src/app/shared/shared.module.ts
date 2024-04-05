import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DrawerBarComponent } from './components/drawer-bar/drawer-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableWithActionsComponent } from './components/table-with-actions/table-with-actions.component'; // Import the MatToolbarModule
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoaderComponentsComponent } from './components/loader-components/loader-components.component';

@NgModule({
  declarations: [

    DrawerBarComponent,
     TableWithActionsComponent,
     LoaderComponentsComponent
  ],
  imports: [CommonModule, MaterialModule, MatSidenavModule, LayoutModule, RouterModule, MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule],
  exports: [CommonModule, MaterialModule, DrawerBarComponent, TableWithActionsComponent, LoaderComponentsComponent],
})
export class SharedModule { }
