import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: any;

  constructor(private fb: FormBuilder, private api: ApiadminService,
    private router: Router) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      //  Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
      ]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
    
  }
  newPassword:any;
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    this.newPassword = this.resetForm?.get('newPassword').value;
    const confirmPassword = control.value;
    
    if (this.newPassword === confirmPassword) {
      return null;
    } else {  
      return { passwordMismatch: true };
    }
  }
  

 

  onSubmit() {
    if (this.resetForm.valid) {
      //call api to send OTP on email
      this.api.post('user/password', { "new_password": `${this.newPassword}`}).subscribe(
        {
          next: (data) => {
             this.router.navigate(['/auth/login']);
            
          },
          error: (error: HttpErrorResponse) => {
           console.log("error", error);
           
          }
        }
      )
      // Perform password reset logic here, e.g., send the new password to the server
      
    }
  }
}
