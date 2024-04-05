import { Component, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginServicesService } from 'src/app/api/auth/login-services.service';
import { LoginAuthService } from '../../services/login-auth.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoadingService } from 'src/app/shared/services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  @ViewChild('forgotPasswordDialog') forgotPasswordDialog: any;
  isLoading: boolean = false;
  logform!: FormGroup;
  hidePassword = true;
  isForgotPasswordVisible?: boolean;
  showOtpVerificationBox: boolean = false;
  enteredemail: any;
  credentialError:boolean=false;

  constructor(private loadingService: LoadingService, private router: Router, public dialog: MatDialog,
    private loginAPIService: LoginServicesService,
    private loginservice: LoginAuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

    this.logform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/)]],
      pass: ['', [Validators.required]]
    });
  }
 


  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  onPasswordChange(key:any){
    this.credentialError= false;
  }
  


  onsubmit(formData: any) {
    if (this.logform.valid) {
      this.loadingService.show();
      this.enteredemail = formData.email;
      const enteredpass = formData.pass;
       
      const body = {    //body for API
        "email": this.enteredemail,
        "password": enteredpass
      }

      this.loginAPIService.loginwithUserandPassword(body).subscribe(
        (data: any) => {
       
          this.loginservice.encryptAndStore(data.access)
    
          this.loadingService.hide();
          this.openSnackBar("Login Successfull")
    
          if (data.is_admin) {
            this.loginservice.setLoginRole("admin")
            this.router.navigate(['./admin']);
          } else {
            this.loginservice.setLoginRole("employee")
            this.router.navigate(['./employee']);
          }

        },
        (error: any) => {
          console.log({
            message: "Failed",
            result: error.error.message
          });
           if((error.error).message == "Invalid credentials."){
            this.credentialError= true;
          this.loadingService.hide();
            
           }

        }
      );
    }
  }


  openForgotPasswordDialog(): void {

    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '400px',  // Set the width as per your requirement
      data: { email: this.logform.value.email },
    });


    // Listen to dialog's afterClosed event to reset the flag
    dialogRef.afterClosed().subscribe(() => {
      this.isForgotPasswordVisible = false; // Hide the template content
    });
  }


  ngOnInit(): void {
    console.log("Route", this.router.url)
    const data = this.loginservice.getLoginRole()
    console.log("User deatils", data)
    if (data === 'admin') {
      this.router.navigate(['admin'])
    } else if (data === 'employee') {
      this.router.navigate(['employee'])
    } else {
      console.log("Not logged")
    }
    // this.loginService.getAllLogin()

  }
  openSnackBar(message: string) {
    let snackBarRef = this.snackBar.open(message,'',{
      duration: 3000,  
       horizontalPosition: 'center', // Center horizontally
      verticalPosition: 'top', // Align to the bottom
      panelClass: 'centered-snackbar'
    });

  }

}

