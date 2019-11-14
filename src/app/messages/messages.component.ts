import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})
export class MessagesComponent implements OnInit {
  messages: [];
  authorization_token: string;
  userId: string;
  email: string;
  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router) {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
  }
  

  ngOnInit() {
    this.apiHandler.getMessages(this.authorization_token).subscribe(
      res => {
        this.messages = JSON.parse(JSON.stringify(res));
      }
    );
  }

}
