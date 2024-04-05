import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiadminService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }


  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${url}`);
  }


  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${url}`, body);
  }

  getWithBody(url:string, body:any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}${url}?page_no=${body.page_no}`, body);
  }

  delete(url:string){
    return this.http.delete<any>(`${this.apiUrl}${url}`);
  }

  put(url:string,body:any){
    return this.http.put<any>(`${this.apiUrl}${url}`, body);
  }
}
