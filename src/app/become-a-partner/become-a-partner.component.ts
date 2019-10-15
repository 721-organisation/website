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
  signUpForm: FormGroup;
  errorText: string;
  signUpErrorText: string;

  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 
    this.signInForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
  });
  this.signUpForm = fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
});
  }
  onSignIn(data) {
    let email = data.email;
    let password = data.password;

    this.apiHandler
    .login(email, password).subscribe(
      res => {
        let authorization = JSON.parse(JSON.stringify(res)).id;
        let userId = JSON.parse(JSON.stringify(res)).userId;
        this.CookieService.set('authorization-token', authorization);
        this.CookieService.set('email', email);
        this.CookieService.set('user-id', userId);
        this.router.navigate(['/partners']);
    },
    err => {
      this.errorText = "Incorrect email or password";
    });
  }

  onSignUp(data){
    let email = data.email;
    let password = data.password;
    let confirmPassword = data.confirmPassword;
    if(password === confirmPassword){
      this.apiHandler.signUp(email, password).subscribe(
        res => {
          this.apiHandler
          .login(email, password).subscribe(
            result => {
                let authorization = JSON.parse(JSON.stringify(result)).id;
                let userId = JSON.parse(JSON.stringify(result)).userId;
                this.CookieService.set('authorization-token', authorization);
                this.CookieService.set('email', email);
                this.CookieService.set('user-id', userId);
                this.router.navigate(['/partners']);
          });
        },
        err => {
          this.signUpErrorText = "Signup failed";
        }
      );
    }else{
      this.signUpErrorText = "Password and confirm password";
    }
  }
  ngOnInit() {
    if((this.CookieService.get('authorization-token'))){
      this.router.navigate(['/partners']);
    }
  }

}
