import { TagCenterComponent } from './tag-center/tag-center.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PressComponent } from './press/press.component';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PartnersComponent } from './partners/partners.component';
import { TeamWebportalComponent } from './team-webportal/team-webportal.component';
import { TeamConsoleComponent } from './team-console/team-console.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'press', component: PressComponent},
  { path: 'become-a-partner', component: BecomeAPartnerComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'partners', component: PartnersComponent},
  { path: 'team', component: TeamConsoleComponent},
  { path: 'team/requested-events', component: TeamWebportalComponent},
  { path: 'team/tag-center', component: TagCenterComponent},
  { path: 'team/messages', component: MessagesComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
