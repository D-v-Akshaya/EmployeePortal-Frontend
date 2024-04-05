import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor() { }
  private secretKey = 'sdofhsodhfsoudhfos349658346';


  setLoginRole(roleName:string){
    localStorage.setItem('role', roleName);
  }

  getLoginRole(){
    return localStorage.getItem('role');
  }
  
  encrypt(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
    return encryptedData;
  }

  decrypt(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  

  encryptAndStore(dataToEncrypt:string) {
    //console.log("Reset token - ", dataToEncrypt)
    const encryptedData = this.encrypt(dataToEncrypt);
    localStorage.setItem('token', encryptedData);
  }

  decryptAndDisplay() {
    const encryptedData = localStorage.getItem('token');
    if (encryptedData) {
      const decryptedData = this.decrypt(encryptedData);
     // console.log(decryptedData);
    }
  }



}
