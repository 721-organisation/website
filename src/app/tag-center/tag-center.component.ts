import { ApiHandlerService } from './../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-tag-center',
  templateUrl: './tag-center.component.html',
  styleUrls: ['./tag-center.component.less']

})
export class TagCenterComponent implements OnInit {
  searchEvents: FormGroup;
  authorization_token: string;
  userId: string;
  email: string;
  events = [];
  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 
    this.searchEvents = fb.group({
      location: ["", Validators.required],
      radius: [0, Validators.required],
      daysFromNow: [0, Validators.required]
  });
  }


  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');  }

  getWithinDistance(data) {
    this.apiHandler.updateNewExplore(this.authorization_token, data.radius, data.daysFromNow,data.location).subscribe(
      res => {
        this.apiHandler.getWithinDistance(this.authorization_token, data.radius, data.daysFromNow,data.location).subscribe(
          result => {
            // result = list of events
            console.log(JSON.parse(JSON.stringify(result)));
            this.events = JSON.parse(JSON.stringify(result)).getWithinDistance;
          }
        )
      }, err => {
          
      }

    );
  }
}
