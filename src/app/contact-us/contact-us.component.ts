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
  images = [];
  constructor(fb: FormBuilder, private apiHandler: ApiHandlerService) {
    this.contactUsForm = fb.group({
      email: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required]
  });
  }

  ngOnInit() {
    this.apiHandler.getInstragramImages().subscribe(
      res => {
        let response = res.graphql.user.edge_owner_to_timeline_media.edges;
        for(let image of response){
          this.images.push(image.node.thumbnail_resources[2].src);
        }
      }
    );
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
