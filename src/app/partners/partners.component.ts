import { ApiHandlerService } from './../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.less']
})
export class PartnersComponent implements OnInit {
  my721 = true;
  profile = false;
  contactUs = false;
  authorization_token: string;
  userId: string;
  email: string;
  companyName: string;
  location: string;
  typeOfService: string;
  constructor(private CookieService: CookieService, private Router: Router, private ApiHandlerService: ApiHandlerService) { }

  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
    this.ApiHandlerService.getPartnerInfo(this.authorization_token, this.userId).subscribe(
      res => {
        let data = JSON.parse(JSON.stringify(res));
        this.companyName = data.companyName;
        this.location = data.Location;
        this.typeOfService = data.typeOfService;
      },
      err => {
        this.Router.navigate(['/become-a-partner']);
      }
    );
  }
  signOut(){
    this.CookieService.set('authorization-token', "");
    this.CookieService.set('email', "");
    this.CookieService.set('user-id', "");
    this.Router.navigate(['/become-a-partner']);
  }
  toggle(selected) {
    if(selected == 'my721') {
      this.my721 = true;
      this.profile = false;
      this.contactUs = false;
    }
    if(selected == 'profile') {
      this.my721 = false;
      this.profile = true;
      this.contactUs = false;
    }
    if(selected == 'contactUs') {
      this.my721 = false;
      this.profile = false;
      this.contactUs = true;
    }
  }

}
