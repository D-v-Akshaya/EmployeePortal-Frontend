import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenServicesService } from './token-services.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GuardServicesService } from '../../shared/services/guard-services.service'


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private token = '';

  constructor(private tokenservices: TokenServicesService, private logoutservices: GuardServicesService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.token = this.tokenservices.decryptAndDisplay()
    if (request.url.includes('user/login')) {
      return next.handle(request);
    }
    if (request.url.includes('user/otp')) {
      return next.handle(request);
    }
    if (request.url.includes('user/verify')) {
      return next.handle(request);
    }

    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    });

    return next.handle(modifiedRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error in intereseter ", error)
        if (error.status === 401) {
          // Token expired or invalid
          this.logoutservices.logout()
          console.log("Token expired")
        }
        return throwError(error);
      })
    );
  }
}
