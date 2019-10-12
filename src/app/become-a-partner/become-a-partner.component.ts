import { ApiHandlerService } from './../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.less']
})
export class BecomeAPartnerComponent implements OnInit {
  signInForm: FormGroup;


  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 
    this.signInForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
  });
  }
  onSignIn(data) {
    let email = data.email;
    let password = data.password;

    this.apiHandler
    .login(email, password).subscribe(
      res => {
      let authorization = JSON.parse(JSON.stringify(res)).id;
      this.CookieService.set('authorization-token', authorization);
      this.router.navigate(['/partners']);
    });
  }
  ngOnInit() {
    if((this.CookieService.get('authorization-token'))){
      this.router.navigate(['/partners']);
    }
  }

}
