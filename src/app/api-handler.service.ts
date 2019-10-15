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

  count (): Observable<string>{
    let finalUrl = this.url + "EventProfiles/count"
    return this.http.get<string>(finalUrl);
  }

  getRequested (access_token: string, email: string): Observable<string>{
    let finalUrl = this.url + "RequestedEvents";
    let filter = encodeURIComponent('{"where":{"email":"'+email+'"}}');
    finalUrl = finalUrl + "?filter=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  createPartner (access_token: string, id: string): Observable<string>{
    let finalUrl = "Partners?access_token="+access_token;
    let body = {
      "id": id
    }
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }

  getPartnerInfo (access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "Partners";
    let filter = encodeURIComponent('{"where":{"userId":"'+id+'"}}');
    finalUrl = finalUrl + "?filter=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  getUserInfoFromId (access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "Users/"+id;
    finalUrl = "?access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }
}
