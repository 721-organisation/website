import { ApiHandlerService } from './../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-webportal',
  templateUrl: './team-webportal.component.html',
  styleUrls: ['./team-webportal.component.less']
})
export class TeamWebportalComponent implements OnInit {
  pending = true;
  accepted = false;
  rejected = false;
  requestedEvents: any[];
  authorization_token: string;
  userId: string;
  email: string;
  constructor(private CookieService: CookieService, private Router: Router, private ApiHandlerService: ApiHandlerService) { }

  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
    this.reRender('Pending');
  }
  toggle(selected) {
    if(selected == 'pending') {
      this.pending = true;
      this.accepted = false;
      this.rejected = false;
      this.reRender('Pending');
    }
    if(selected == 'accepted') {
      this.pending = false;
      this.accepted = true;
      this.rejected = false;
      this.reRender('Accepted');

    }
    if(selected == 'rejected') {
      this.pending = false;
      this.accepted = false;
      this.rejected = true;
      this.reRender('Rejected');

    }
  }
  reRender(status){
    this.ApiHandlerService.getRequestedEvents(this.authorization_token, status).subscribe(
      res => {
        this.requestedEvents = JSON.parse(JSON.stringify(res));
      },
      err => {
        this.Router.navigate(['/become-a-partner']);
      }
    );
  }

  accept(id, event){
    this.ApiHandlerService.acceptRequestedEvent(this.authorization_token, id).subscribe(
      res => {
          delete event.status;
          delete event.email;
          delete event.id;
          this.ApiHandlerService.addEvent(this.authorization_token, event).subscribe(
            result => {
              console.log("event added");
              this.reRender('Pending');
            }
          );
        }
    );
  }

  reject(id){
    this.ApiHandlerService.rejectRequestedEvent(this.authorization_token, id).subscribe(
      res => {
        this.reRender('Pending');
      }
    );
  }
}
