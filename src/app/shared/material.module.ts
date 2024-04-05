import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
    // Export other Angular Material components here
  ],
})
export class MaterialModule { }
