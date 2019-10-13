import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})

export class HomePageComponent implements OnInit {
  apiUrl = 'https://temp-243314.appspot.com/api';
  swipes = 0;
  constructor(private apiHandler: ApiHandlerService) { 
    
  }

  ngOnInit() {
    this.apiHandler.count().subscribe(
      res => {
        this.swipes = JSON.parse(JSON.stringify(res)).count;
      }
    );

  }

}
