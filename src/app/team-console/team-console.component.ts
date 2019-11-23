import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-console',
  templateUrl: './team-console.component.html',
  styleUrls: ['./team-console.component.less']
})
export class TeamConsoleComponent implements OnInit {
  signedIn = false;
  authorization_token: string;
  userId: string;
  email: string;
  skiddleEventNo: number;
  eventBriteEventNo: number;
  ticketMasterEventNo: number;
  businessEventNo: number;
  positiveSwipes: number;
  negativeSwipes: number;
  swipes: number;
  events: number;
  partners: number;
  users: number;
  teamMessages: any;
  addMessageForm: FormGroup;

  constructor(private apiHandler: ApiHandlerService, private CookieService: CookieService, private router: Router, fb: FormBuilder) {
    this.addMessageForm = fb.group({
      message: ["", Validators.required],
  });
  }

  onAddMessage(data){
    let body = {
      message: data.message,
      timestamp: (new Date()).toLocaleDateString()
    }
    this.apiHandler.addTeamMessage(this.authorization_token, body).subscribe(
      res => {
        location.reload();
      }
    );
  }

  removeMessage(id){
    this.apiHandler.deleteTeamMessageById(this.authorization_token, id).subscribe(
      res => {
        location.reload();
      }
    );
  }

  ngOnInit() {
    this.authorization_token = this.CookieService.get('authorization-token');
    this.userId = this.CookieService.get('user-id');
    this.email = this.CookieService.get('email');

    if(this.CookieService.get('authorization-token')){
      this.signedIn = true;
    }

      
    this.apiHandler.countEventFromProvider(this.authorization_token, "BUSINESS").subscribe(
      r => {
        this.businessEventNo = JSON.parse(JSON.stringify(r)).count;
        this.apiHandler.countEventFromProvider(this.authorization_token, "SKIDDLE").subscribe(
          re => {
            this.skiddleEventNo = JSON.parse(JSON.stringify(re)).count;
            this.apiHandler.countEventFromProvider(this.authorization_token, "EVENTBRITE").subscribe(
              res => {
                this.eventBriteEventNo = JSON.parse(JSON.stringify(res)).count;
                this.apiHandler.countEventFromProvider(this.authorization_token, "TICKETMASTER").subscribe(
                  resu => {
                    this.ticketMasterEventNo = JSON.parse(JSON.stringify(resu)).count;
                    let eventSourcesChart = new CanvasJS.Chart("eventSourcesChart", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: true,
                      title:{
                        text: "Distribution of event sources"
                      },
                      data: [{
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
                        indexLabel: "{name} - #percent%",
                        dataPoints: [
                          { y: this.skiddleEventNo, name: "Skiddle" },
                          { y: this.eventBriteEventNo, name: "Eventbrite" },
                          { y: this.ticketMasterEventNo, name: "Ticket Master" },
                          { y: this.businessEventNo, name: "Partners" }
                        ]
                      }]
                    });
                    eventSourcesChart.render();
                });
            });
        });
    });
    this.apiHandler.countSwipeFromDecision(this.authorization_token, true).subscribe(
      res => {
        this.positiveSwipes = JSON.parse(JSON.stringify(res)).count;
        this.apiHandler.countSwipeFromDecision(this.authorization_token, false).subscribe(
          re => {
            this.negativeSwipes = JSON.parse(JSON.stringify(re)).count;
            let swipeChart = new CanvasJS.Chart("swipeChart", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: true,
              title:{
                text: "Distribution of swipes"
              },
              data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "<b>{name}</b>: {y} (#percent%)",
                indexLabel: "{name} - #percent%",
                dataPoints: [
                  { y: this.positiveSwipes, name: "Yes" },
                  { y: this.negativeSwipes, name: "No" }
                ]
              }]
            });
            swipeChart.render();
          }
        );
      }
    );
    this.apiHandler.countSwipes().subscribe(
      res => {
        this.swipes = JSON.parse(JSON.stringify(res)).count;
      }
    );

    this.apiHandler.countEvents(this.authorization_token).subscribe(
      res => {

            this.apiHandler.countPartners(this.authorization_token).subscribe(
              r => {
                this.apiHandler.countUsers(this.authorization_token).subscribe(
                  resu => {
                    this.events = JSON.parse(JSON.stringify(res)).count;
                    this.partners = JSON.parse(JSON.stringify(r)).count;
                    this.users =  JSON.parse(JSON.stringify(resu)).count;
                    this.apiHandler.getTeamMessages(this.authorization_token).subscribe(
                      messages => {
                        this.teamMessages  = JSON.parse(JSON.stringify(messages));
                      }
                    );
                  }
                )
          }
        );
      }
    );




  }

}
