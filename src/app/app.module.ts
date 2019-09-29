import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    PageNotFoundComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
