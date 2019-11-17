import { ApiHandlerService } from './../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'
import { transformAll } from '@angular/compiler/src/render3/r3_ast';
import { filter } from 'minimatch';

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
  searchLocation: string;
  searchRadius: string;
  searchDays: string;
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
    this.email = this.CookieService.get('email');  
    this.searchLocation = this.CookieService.get('tag-center-search-location');
    this.searchRadius = this.CookieService.get('tag-center-search-radius');
    this.searchDays = this.CookieService.get('tag-center-search-days');
    if(this.searchLocation){
      let data = {
        radius: this.searchRadius,
        daysFromNow: this.searchDays,
        location: this.searchLocation
      }
      this.getWithinDistance(data);
    }
  }

  getWithinDistance(data) {
    this.apiHandler.updateNewExplore(this.authorization_token, data.radius, data.daysFromNow,data.location).subscribe(
      res => {
        this.apiHandler.getWithinDistance(this.authorization_token, data.radius, data.daysFromNow,data.location).subscribe(
          result => {
            // result = list of events
            console.log(JSON.parse(JSON.stringify(result)));
            this.events = JSON.parse(JSON.stringify(result)).getWithinDistance;
            this.CookieService.set('tag-center-search-location',data.location);
            this.CookieService.set('tag-center-search-days',data.daysFromNow);
            this.CookieService.set('tag-center-search-radius',data.radius);
          }
        )
      }, err => {
          
      }

    );
  }

  addTag(id){
    let inputValue = (<HTMLInputElement>document.getElementById(id)).value.toUpperCase();
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        let event = this.events[i];
        let tags = [];
        if(!event.tag){
          tags.push(inputValue);
        }else{
          tags = tags.concat(event.tag);
          tags.push(inputValue);
        }
        let body = {"tag": tags};
        this.apiHandler.addTag(this.authorization_token, id, body).subscribe(
          res=>{location.reload();}
        );
      }
    }
  }
  removeTag(id, tag){
    for (let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        let event = this.events[i];
        let tags = [];
        tags = event.tag.filter(function(filter_tag) {
          return !(filter_tag === tag);
        });
        let body = {"tag": tags};
        this.apiHandler.removeTag(this.authorization_token, id, body).subscribe(
          res=>{location.reload();}
        );
      }
    }
  }
}
