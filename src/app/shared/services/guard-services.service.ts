import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GuardServicesService {
  // private secretKey = 'sdofhsodhfsoudhfos349658346';

  constructor( private router: Router) { }

  getRoleCheck(authRole: string):any {
    
    if (localStorage.getItem('role') === authRole) {
      return true
    } else {
      return false
    }
  }

  decryptAndDisplay(): any {
    const encryptedData = localStorage.getItem('token');
    if (encryptedData) {
      const decryptedData = this.decrypt(encryptedData);
      return true
    }
    return false
  }

  decrypt(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  logout() {
    console.log("Logout Called")
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('LoginInfo');
    // localStorage.removeItem('role');
    this.router.navigate(['./auth/login']);
  }


  
}
