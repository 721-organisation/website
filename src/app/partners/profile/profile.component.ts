import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from './../../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  authorization_token: string;
  userId: string;
  email: string;
  companyName = "";
  location = "";
  typeOfService = "";

  constructor(private CookieService: CookieService, private Router: Router, private ApiHandlerService: ApiHandlerService) { }

  ngOnInit() {
    console.log("Hello");
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
    this.ApiHandlerService.getPartnerInfo(this.authorization_token, this.userId).subscribe(
      res => {
        let data = JSON.parse(JSON.stringify(res))[0];
        this.companyName = data.companyName;
        this.location = data.Location;
        this.typeOfService = data.typeOfService;
      }
    );
  }

}
