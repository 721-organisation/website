import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamConsoleComponent } from './team-console.component';

describe('TeamConsoleComponent', () => {
  let component: TeamConsoleComponent;
  let fixture: ComponentFixture<TeamConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
