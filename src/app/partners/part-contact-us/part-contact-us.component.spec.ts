import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartContactUsComponent } from './part-contact-us.component';

describe('PartContactUsComponent', () => {
  let component: PartContactUsComponent;
  let fixture: ComponentFixture<PartContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
