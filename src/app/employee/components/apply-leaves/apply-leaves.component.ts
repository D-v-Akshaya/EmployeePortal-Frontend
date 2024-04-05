import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms'
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MyLeavesComponent } from '../my-leaves/my-leaves.component';
@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent {


  leaveform!: FormGroup;
  range!: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private api: ApiadminService,
    public dialogRef: MatDialogRef<MyLeavesComponent>) 
    {
    this.leaveform = this.formBuilder.group({
      leavetype: ['', Validators.required],
      no_of_days: [0, [Validators.required, Validators.min(0)]],
      reason: ['', Validators.required]
    });

    this.range = this.formBuilder.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    });

  }

  dateformater(date: any) {
    const dobDate = new Date(date);
    const year = dobDate.getFullYear();
    const month = String(dobDate.getMonth() + 1).padStart(2, '0');
    const day = String(dobDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Implement your submit logic here
  onsubmit() {
    if (this.leaveform.invalid && this.range.invalid) {
      console.log("hello")
    }
    else {
      const leavetype = this.leaveform.value.leavetype;
      const start = this.range.value.start;
      const end = this.range.value.end;
      const reason = this.leaveform.value.reason;

      const startdate = this.dateformater(start)
      const enddate = this.dateformater(end)
      const timeDifference = end - start;

      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      const body = {
        "leave_type": leavetype,
        "from_date": startdate,
        "till_date": enddate,
        "no_of_days": daysDifference,
        "reason": reason
      }
      console.log(JSON.stringify(body))
      this.api.post('leaves/add', JSON.stringify(body)).subscribe(
        (response) => {
          console.log(response);

          this.dialogRef.close();
        },
        (error) => {
          console.log(error)
    
            this.dialogRef.close();
          
        }
      )

    }
  }
}
