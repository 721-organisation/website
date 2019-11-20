import { ApiHandlerService } from './api-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material'  
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JourneyComponent } from './journey/journey.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BfooterComponent } from './bfooter/bfooter.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PressComponent } from './press/press.component';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PartnersComponent } from './partners/partners.component';
import { MyComponent } from './partners/my/my.component';
import { ProfileComponent } from './partners/profile/profile.component';
import { AddListingComponent } from './partners/add-listing/add-listing.component';
import { TeamWebportalComponent } from './team-webportal/team-webportal.component';
import { TagCenterComponent } from './tag-center/tag-center.component';
import { TeamConsoleComponent } from './team-console/team-console.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MessagesComponent } from './messages/messages.component';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JourneyComponent,
    ReviewsComponent,
    BfooterComponent,
    HomePageComponent,
    AboutUsComponent,
    PressComponent,
    BecomeAPartnerComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    PartnersComponent,
    MyComponent,
    ProfileComponent,
    AddListingComponent,
    TeamWebportalComponent,
    TagCenterComponent,
    TeamConsoleComponent,
    SignInComponent,
    MessagesComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgbCollapseModule
    ],
  providers: [
    ApiHandlerService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
