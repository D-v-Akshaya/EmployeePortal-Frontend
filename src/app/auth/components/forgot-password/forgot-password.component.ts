import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiadminService } from 'src/app/api/admin/apiadmin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: any;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private rout: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiadminService,
    private loginservice: LoginAuthService,
    
    public dialog: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {email:any},
  ) {
  
    this.forgotPasswordForm = this.fb.group({
      email: [this.data.email, [Validators.required, Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{3,4}$')]]

    });


  }

  forgotPasswordForm: any;
  showOtpVerificationBox: boolean = false;
  enteredOTP: any;
  OtpError: any;
  emailNotExist: boolean = false;
  email: string = '';
  


  //send OPT on email
  sendOtp(FormData: any) {
    if (this.forgotPasswordForm.valid) {
      this.emailNotExist = false;
      this.email = FormData.email;
      //call api to send OTP on email
      this.api.post('user/otp', { "email": this.email }).subscribe(
        {
          next: (data) => {
            console.log("send otp data", data);
            this.showOtpVerificationBox = true;
          },
          error: (error: HttpErrorResponse) => {
            if (error.status == 401) {
              this.emailNotExist = true;

            }
          }
        }
      )

    }
  }

  disabledErrorMsg(){
    this.emailNotExist = false;
  }
  onVerifyClick() {

    if (this.isValidOTP()) {
      //call api to send OTP on email
      this.api.post('user/verify', { "email": this.email, "otp": this.enteredOTP }).subscribe(
        {
          next: (data) => {
            console.log("verify OTP ", data);
            // Navigate to the 'resetPassword' route
            this.loginservice.encryptAndStore(data.access)
            this.router.navigate(['/auth/resetPassword']);
            this.dialogRef.close();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status == 400) {
              this.OtpError = "Enter valid OTP";
              setTimeout(() => {
                this.OtpError='';
              },3000);
            }
           
          }
        }
      )

    }
  }

  isValidOTP() {
    console.log("entered OTP is :", this.enteredOTP);
    this.OtpError = '';

    if (this.enteredOTP == '') {
      this.OtpError = "OTP is required";
      console.log(this.OtpError);
      return false;
    }
    else if (this.enteredOTP.length != 4) {
      this.OtpError = "Enter 4 digit OTP";
      return false;
    }
    else {
      return true;

    }

  }
  onOtpChange($event: any) {
    this.enteredOTP = $event;
  }
  cancelDialog(): void {
    this.dialogRef.close();
  }

}
