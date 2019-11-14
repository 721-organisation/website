import { ApiHandlerService } from './../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;

  constructor(fb: FormBuilder, private apiHandler: ApiHandlerService) {
    this.contactUsForm = fb.group({
      email: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required]
  });
  }

  ngOnInit() {
  }

  contactUs(data){
    let body = 
    {
      email: data.email,
      subject: data.subject,
      data: data.message,
      timeStamp: Date.now()
    }
    this.apiHandler.sendMessage(body).subscribe(
      res => {
        location.reload;
      }
    );
  }

}
