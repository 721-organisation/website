import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiHandlerService } from '../api-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  authorization_token: string;
  userId: string;
  email: string;
  companyName: string;

  constructor(private CookieService: CookieService, private apiHandler: ApiHandlerService, private router: Router) { }
  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');  
    this.apiHandler.getPartnerInfo(this.authorization_token, this.userId).subscribe(
      res => {
        let data = JSON.parse(JSON.stringify(res))[0];
        this.companyName = data.companyName;
      }
    );
  }

  signOut(){
    this.CookieService.set('authorization-token', '');
    this.CookieService.set('email', '');
    this.CookieService.set('user-id', '');
    location.reload();
  }
}
