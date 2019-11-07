import { ApiHandlerService } from './../api-handler.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  errorText: string;
  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) { 
    this.signInForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
  });
  }

  ngOnInit() {
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
        location.reload();
    },
    err => {
      this.errorText = "Incorrect email or password";
    });
  }
}
