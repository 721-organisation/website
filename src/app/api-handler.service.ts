import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UrlHandlingStrategy } from '@angular/router';

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

  countSwipes (): Observable<string>{
    let finalUrl = this.url + "EventProfiles/count"
    return this.http.get<string>(finalUrl);
  }

  countEvents(access_token: string): Observable<string>{
    let finalUrl = this.url + "Events/count?access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  countPartners(access_token: string): Observable<string>{
    let finalUrl = this.url + "Partners/count?access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  countUsers(access_token: string): Observable<string>{
    let finalUrl = this.url + "Profiles/count?access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }
  getRequested (access_token: string, email: string): Observable<string>{
    let finalUrl = this.url + "RequestedEvents";
    let filter = encodeURIComponent('{"where":{"email":"'+email+'"}}');
    finalUrl = finalUrl + "?filter=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  countEventFromProvider(access_token: string, provider: string): Observable<string>{
    let finalUrl = this.url + "Events/count";
    let filter = encodeURIComponent('{"eventSourceTag":"'+provider+'"}');
    finalUrl = finalUrl + "?where=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl); 
  }

  countSwipeFromDecision(access_token: string, swipe: boolean): Observable<string>{
    let finalUrl = this.url + "eventProfiles/count";
    let filter = encodeURIComponent('{"swipe":"'+swipe+'"}');
    finalUrl = finalUrl + "?where=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl); 
  }
  createPartner (access_token: string, id: string, companyName: string): Observable<string>{
    let finalUrl = this.url + "Partners?access_token="+access_token;
    let body = {
      "userId": id,
      "companyName": companyName
    }
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }

  getPartnerInfo (access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "Partners/";
    let filter = encodeURIComponent('{"where":{"userId": {"like":"'+id+'"}}}');
    finalUrl = finalUrl + "?filter=" + filter;
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  getUserInfoFromId (access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "Users/"+id;
    finalUrl = "?access_token=" + access_token;
    return this.http.get<string>(finalUrl);
  }

  addListing(access_token: string, body: Object): Observable<string>{
    let finalUrl = this.url +  "requestedEvents?access_token="+access_token;
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }
  editPartnerInformation(access_token: string,id: string, body: Object): Observable<string>{
    let finalUrl = this.url + "Partners/update"
    finalUrl = finalUrl + "?where=%7B%22userId%22%3A%7B%22like%22%3A%20%22"+id+"%22%7D%7D";
    finalUrl = finalUrl + "&access_token=" + access_token;
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }

  addTag(access_token: string, id: string, body: Object): Observable<string>{
    let finalUrl = this.url + "Events/update?where=%7B%22id%22%3A%22"+id+"%22%7D&access_token="+access_token;
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }
  removeTag(access_token: string, id: string, body: Object): Observable<string>{
    let finalUrl = this.url + "Events/update?where=%7B%22id%22%3A%22"+id+"%22%7D&access_token="+access_token;
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }
  editRequestedEvent(access_token: string, eventSourceId: string, body: object): Observable<string>{
    let finalUrl = this.url + "requestedEvents/update?where=%7B%22eventSourceId%22%3A%22"+eventSourceId+"%22%7D&access_token="+access_token;
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }
  changePassword(access_token: string, oldPasswordS: string, newPasswordS: string): Observable<string>{
    let finalUrl = this.url + "Users/change-password?access_token="+access_token;
    let newHttpOptions = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Connection': 'keep-alive',
        'accept-encoding': 'gzip, deflate',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = new HttpParams()
    .set('oldPassword', oldPasswordS)
    .set('newPassword', newPasswordS);

    return this.http.post<string>(finalUrl, body.toString(), newHttpOptions);
  }

  getRequestedEvents(access_token: string, status: string): Observable<string>{
    let finalUrl = this.url + "RequestedEvents?filter=%7B%22where%22%3A%7B%22status%22%3A%22"+status+"%22%7D%7D&access_token="+access_token;
    return this.http.get<string>(finalUrl);
  }

  rejectRequestedEvent(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "requestedEvents/update?where=%7B%22id%22%3A%22"+id+"%22%7D&access_token="+access_token;
    let body = {
      "status":"Rejected"
      }
    return this.http.post<string>(finalUrl, body, this.httpOptions);
  }

  acceptRequestedEvent(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "requestedEvents/update?where=%7B%22id%22%3A%22"+id+"%22%7D&access_token="+access_token;
    let body = {
      "status":"Accepted"
      }
    return this.http.post<string>(finalUrl, body, this.httpOptions);   
  }

  revokeRequestedEvent(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "requestedEvents/update?where=%7B%22id%22%3A%22"+id+"%22%7D&access_token="+access_token;
    let body = {
      "status":"Pending"
      }
    return this.http.post<string>(finalUrl, body, this.httpOptions);   
  }

  addEvent(access_token: string, event: object): Observable<string>{
    let finalUrl = this.url + "events?access_token="+access_token;
    return this.http.post<string>(finalUrl, event, this.httpOptions);
  }

  deleteRequestedEventFromId(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "requestedEvents/"+id+"?access_token="+access_token;
    return this.http.delete<string>(finalUrl);
  }

  updateNewExplore(access_token: string, radius: string, daysFromNow: string, location: string){
    let finalUrl = this.url + "events/updateNew?access_token="+access_token;
    let newHttpOptions = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Connection': 'keep-alive',
        'accept-encoding': 'gzip, deflate',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = new HttpParams()
    .set('radius', radius)
    .set('daysFromNow', daysFromNow)
    .set('explore', 'true')
    .set('location', location);

    return this.http.put<string>(finalUrl, body.toString(), newHttpOptions);
  }

  getWithinDistance(access_token: string, radius: string, daysFromNow: string, location: string){
    let finalUrl = this.url + "events/getWithinDistance?radius="+radius+"&daysFromNow="+daysFromNow+"&explore=true&location="+encodeURIComponent(location)+"&access_token="+access_token;
    return this.http.get<string>(finalUrl);
  }

  getMessages(access_token: string): Observable<string>{
    let finalUrl = this.url + "messages";
    return this.http.get<string>(finalUrl);
  }

  sendMessage(body: object): Observable<string>{
    let finalUrl = this.url + "messages";
    return this.http.post<string>(finalUrl, body);
  }

  countSwipesOfEvent(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url +"eventProfiles/count?where=%7B%22eventSourceId%22%3A%22"+id+"%22%7D&access_token="+access_token;
    return this.http.get<string>(finalUrl);
  }

  countSwipesOfEventType(access_token: string, id: string, type: boolean): Observable<string>{
    let finalUrl = this.url +"eventProfiles/count?where=%7B%22swipe%22%3A%22"+type+"%22%2C%22eventSourceId%22%3A%22"+id+"%22%7D&access_token="+access_token;
    return this.http.get<string>(finalUrl);
  }

  deleteRequestedMessageFromId(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "messages/"+id+"?access_token="+access_token;
    return this.http.delete<string>(finalUrl);
  }

  getTeamMessages(access_token: string): Observable<string>{
    let finalUrl = this.url + "teamMessages/?access_token="+access_token;
    return this.http.get<string>(finalUrl);
  }

  addTeamMessage(access_token: string, body: object): Observable<string>{
    let finalUrl = this.url + "teamMessages/?access_token="+access_token;
    return this.http.post<string>(finalUrl, body);
  }

  deleteTeamMessageById(access_token: string, id: string): Observable<string>{
    let finalUrl = this.url + "teamMessages/"+id+"?access_token="+access_token;
    return this.http.delete<string>(finalUrl);
  }
  getLocationInformation(address: string): Observable<any>{
    let finalUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyA7MxC0c6PPV6HXw5lTmcN_5dW-I84MRbQ";
    return this.http.get<string>(finalUrl);
  }

  getInstragramImages(): Observable<any>{
    let finalUrl = "https://www.instagram.com/721app/?__a=1";
    return this.http.get<string>(finalUrl);
  }


}
