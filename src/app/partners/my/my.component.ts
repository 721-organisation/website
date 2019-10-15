import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from './../../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'my-721',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.less']
})
export class MyComponent implements OnInit {

  headElements = ['Name', 'Date', 'Status'];
  constructor(private CookieService: CookieService, private Router: Router, private ApiHandlerService: ApiHandlerService) { }
  authorization_token = "";
  email = "";
  userId = "";
  requestedEvents = [];
  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
    this.ApiHandlerService.getRequested(this.authorization_token, this.email).subscribe(
      res => {
        console.log(res);
        this.requestedEvents = JSON.parse(JSON.stringify(res));
      }
    );
  }

}
