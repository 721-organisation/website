import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  editCompanyNameForm: FormGroup;
  editLocationForm: FormGroup;
  editTypeOfServiceForm: FormGroup;

  constructor(private CookieService: CookieService, private Router: Router, private ApiHandlerService: ApiHandlerService, fb: FormBuilder) { 
    this.editCompanyNameForm = fb.group({
      companyName: ["", Validators.required]
    });
    this.editLocationForm = fb.group({
      location: ["", Validators.required]
    });
    this.editTypeOfServiceForm = fb.group({
      typeOfService: ["", Validators.required]
    });
  }

  ngOnInit() {
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
  editCompanyName(data) {
    console.log(data);
    let newCompanyName = data.companyName;
    let body = {
      "companyName" : newCompanyName
    };
    console.log(body);
    this.ApiHandlerService.editPartnerInformation(this.authorization_token, this.userId, body).subscribe();
  }

  editLocation(data) {
    let newLocation = data.location;
    let body = {
      "Location" : newLocation
    };
    this.ApiHandlerService.editPartnerInformation(this.authorization_token, this.userId, body).subscribe();
  }

  editTypeOfService(data) {
    let newTypeOfService = data.typeOfService;
    let body = {
      "typeOfService" : newTypeOfService
    };
    this.ApiHandlerService.editPartnerInformation(this.authorization_token, this.userId, body).subscribe();
  }

}
