import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.less']
})
export class PartnersComponent implements OnInit {
  my721 = true;
  profile = false;
  contactUs = false;
  constructor() { }

  ngOnInit() {
  }

  toggle(selected) {
    if(selected == 'my721') {
      this.my721 = true;
      this.profile = false;
      this.contactUs = false;
    }
    if(selected == 'profile') {
      this.my721 = false;
      this.profile = true;
      this.contactUs = false;
    }
    if(selected == 'contactUs') {
      this.my721 = false;
      this.profile = false;
      this.contactUs = true;
    }
  }

}
