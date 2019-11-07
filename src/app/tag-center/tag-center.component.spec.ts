import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCenterComponent } from './tag-center.component';

describe('TagCenterComponent', () => {
  let component: TagCenterComponent;
  let fixture: ComponentFixture<TagCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
