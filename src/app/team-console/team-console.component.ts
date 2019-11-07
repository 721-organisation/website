import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-console',
  templateUrl: './team-console.component.html',
  styleUrls: ['./team-console.component.less']
})
export class TeamConsoleComponent implements OnInit {
  signedIn = false;
  authorization_token: string;
  userId: string;
  email: string;

  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router) {

  }

  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');

    if((this.CookieService.get('authorization-token'))){
      this.signedIn = true;
    }
  }

}
