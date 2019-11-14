import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from './../../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-721',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.less']
})
export class MyComponent implements OnInit {
  addListingDisplay = false;
  headElements = ['Name', 'Date', 'Status'];
  editListingForm: FormGroup;
  constructor(private CookieService: CookieService,  private Router: Router, private apiHandler: ApiHandlerService, fb: FormBuilder) { 
    this.editListingForm = fb.group({
      venueName: ["", Validators.required],
      venueAddress: ["", Validators.required],
      eventName: ["", Validators.required],
      eventDescription: ["", Validators.required],
      eventLink: ["", Validators.required],
      eventImageUrl: ["", Validators.required],
      eventDate: ["", Validators.required],
      eventTime: ["", Validators.required],
      eventPrice: ["", Validators.required],
      eventMinAge: ["", Validators.required]
  });
  }
  authorization_token = "";
  email = "";
  userId = "";
  viewEvent = "";
  editEvent = "";
  requestedEvents = [];
  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');
    this.apiHandler.getRequested(this.authorization_token, this.email).subscribe(
      res => {
        console.log(res);
        this.requestedEvents = JSON.parse(JSON.stringify(res));
      },
      err => {
        // On Failure
      }
    );
  }
  toggleView(id) {
    if(id != this.viewEvent){
      this.viewEvent = id;
      this.editEvent = "";
    }else{
      this.viewEvent = "";
    }
  }

  toggleEdit(id) {
    if(id != this.editEvent){
      this.editEvent = id;
      this.viewEvent = "";
    }else{
      this.editEvent = "";
    }
  }
  toggleAddListing() {
    this.addListingDisplay = !this.addListingDisplay;
  }
  editListing(data, eventSourceId){

    if(data.venueAddress){
      this.apiHandler.getLocationInformation(data.venueAddress).subscribe(
        latLng=>{
          let addressLatLong = latLng.results[0].geometry.location;
          let body = {
            "name": data.eventName,
            "venueName": data.venueName,
            "venueLat": addressLatLong.lat,
            "venueLong": addressLatLong.lng,
            "image": data.eventImageUrl,
            "link": data.eventLink,
            "date": data.eventDate,
            "time": data.eventTime,
            "minAge": data.eventMinAge,
            "price": data.eventPrice,
            "description": data.eventDescription
          }
          for (var propName in body) { 
            if (body[propName] == "" || body[propName] === undefined) {
              delete body[propName];
            }
          }
          this.apiHandler.editRequestedEvent(this.authorization_token, eventSourceId, body).subscribe(
            res =>{
              location.reload();
            }
          );
          
        }
      )
    } else{
      let body = {
        "name": data.eventName,
        "venueName": data.venueName,
        "image": data.eventImageUrl,
        "link": data.eventLink,
        "date": data.eventDate,
        "time": data.eventTime,
        "minAge": data.eventMinAge,
        "price": data.eventPrice,
        "description": data.eventDescription
      }
      for (var propName in body) { 
        if (body[propName] == "" || body[propName] === undefined) {
          delete body[propName];
        }
      }

      this.apiHandler.editRequestedEvent(this.authorization_token, eventSourceId, body).subscribe(
        res =>{
          location.reload();
        }
      );

    }
  }
  removeEvent(id) {
    this.apiHandler.deleteRequestedEventFromId(this.authorization_token, id).subscribe(
      res => {
        this.Router.navigate(['/become-a-partner']);
      },err => {
        // Error
      }
    );
  }
}
