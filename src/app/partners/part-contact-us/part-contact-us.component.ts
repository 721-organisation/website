import { ApiHandlerService } from './../../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-part-contact-us',
  templateUrl: './part-contact-us.component.html',
  styleUrls: ['./part-contact-us.component.less']
})
export class PartContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  authorization_token: string;
  userId: string;
  email: string;
  companyName: string;
  constructor(private CookieService: CookieService, fb: FormBuilder, private apiHandler: ApiHandlerService) {
    this.contactUsForm = fb.group({
      subject: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
  }
  contactUs(data){
    let body = 
    {
      email: this.email,
      subject: data.subject,
      data: data.message,
      verified: true,
      timeStamp: Date.now()
    }
    this.apiHandler.sendMessage(body).subscribe(
      res => {
        location.reload();
      }
    );
  }
}
