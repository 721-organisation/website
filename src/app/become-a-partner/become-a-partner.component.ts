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
  signUpForm: FormGroup;
  errorText: string;
  signUpErrorText: string;

  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 

  this.signUpForm = fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
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
                this.apiHandler.createPartner(authorization, userId, "submitCompanyName").subscribe(results =>{
                  location.reload();
                  this.router.navigate(['/partners']);
                });
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

  ngOnChanges(){
    if((this.CookieService.get('authorization-token'))){
      this.router.navigate(['/partners']);
    }
  }

}
