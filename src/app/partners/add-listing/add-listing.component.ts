import { MyComponent } from './../my/my.component';
import { ApiHandlerService } from './../../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'
@Component({
  selector: 'add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.less']
})
export class AddListingComponent implements OnInit {
  addListingForm: FormGroup;
  authorization_token: string;
  userId: string;
  email: string;
  logoImageUrl: any;
  companyName: any;
  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 
    this.addListingForm = fb.group({
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


  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');   
    this.apiHandler.getPartnerInfo(this.authorization_token, this.userId).subscribe(result => {
      this.logoImageUrl = JSON.parse(JSON.stringify(result))[0].logoImageUrl;
      this.companyName = (JSON.parse(JSON.stringify(result))[0].companyName).toUpperCase();
    });
  }

  addListing(data){
    this.apiHandler.getLocationInformation(data.venueAddress).subscribe(
        latLng=>{
          let addressLatLong = latLng.results[0].geometry.location;
          let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
          let string_length = 16;
          let randomstring = "";
          for (var i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
          }
          if (data.eventImageUrl == "") {
            if(this.logoImageUrl != undefined) {
              data.eventImageUrl = this.logoImageUrl;
            }else{
              alert("You have not submitted an image and you don't have a logo image set");
              data.eventImageUrl = "https://countrylakesdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg";
            }
          }
          let body = {
            "name": data.eventName,
            "eventSourceTag": this.companyName,
            "eventSourceId": randomstring,
            "venueName": data.venueName,
            "venueLat": addressLatLong.lat,
            "venueLong": addressLatLong.lng,
            "image": data.eventImageUrl,
            "link": data.eventLink,
            "date": data.eventDate,
            "time": data.eventTime,
            "minAge": data.eventMinAge,
            "price": data.eventPrice,
            "description": data.eventDescription,
            "email": this.email,
            "status": "Pending"
          }
          this.apiHandler.addListing(this.authorization_token, body).subscribe(
            res => {
              console.log("Success");
              this.router.navigate(['/become-a-partner']);
            },
            err => {
              console.log(err);    
            }
          );
        }
      );

  }
}
