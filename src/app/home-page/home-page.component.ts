import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})

export class HomePageComponent implements OnInit {
  apiUrl = 'https://temp-243314.appspot.com/api';
  constructor(private apiHandler: ApiHandlerService) { 
    
  }

  ngOnInit() {

  }
  contactUs(){
    let body_email = (<HTMLInputElement>document.getElementById('iphoneEmail')).value
    let body = 
    {
      email: body_email,
      subject: 'IPHONE USER',
      data: 'INTERESTED IN IPHONE BETA',
      timeStamp: Date.now()
    }
    this.apiHandler.sendMessage(body).subscribe(
      res => {
        location.reload;
      }
    );
  }
}
