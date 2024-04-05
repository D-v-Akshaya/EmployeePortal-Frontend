import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TokenServicesService {

  constructor() { }
  
  decryptAndDisplay(): any {
    const encryptedData = localStorage.getItem('token');
    if (encryptedData) {
      const decryptedData = this.decrypt(encryptedData);
      return decryptedData
    }
    return ""
  }

  decrypt(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

}
