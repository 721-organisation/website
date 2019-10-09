import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})

export class HomePageComponent implements OnInit {
  apiUrl = 'https://temp-243314.appspot.com/api';
  swipes = 0;
  constructor() { 
  }

  ngOnInit() {
    this.swipes++;

  }

}
