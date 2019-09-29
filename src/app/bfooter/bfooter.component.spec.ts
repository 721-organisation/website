import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BfooterComponent } from './bfooter.component';

describe('BfooterComponent', () => {
  let component: BfooterComponent;
  let fixture: ComponentFixture<BfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
