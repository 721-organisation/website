import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWebportalComponent } from './team-webportal.component';

describe('TeamWebportalComponent', () => {
  let component: TeamWebportalComponent;
  let fixture: ComponentFixture<TeamWebportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamWebportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWebportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
