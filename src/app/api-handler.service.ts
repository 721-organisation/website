import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiHandlerService {
  url = "https://temp-243314.appspot.com/api/";
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'cache-control': 'no-cache',
      'Connection': 'keep-alive',
      'accept-encoding': 'gzip, deflate',
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }),
  };
  login (email: string, password: string): Observable<string>{
    let finalUrl = this.url + "Users/login";
    let body = {
      "email": email,
      "password": password
    }
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }

  signUp (email: string, password: string): Observable<string>{
    let finalUrl = this.url + "Users"
    let body = {
      "email": email,
      "password": password
    }
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }
}
