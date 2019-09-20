import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileapplydetailComponent } from './mobileapplydetail.component';

describe('MobileapplydetailComponent', () => {
  let component: MobileapplydetailComponent;
  let fixture: ComponentFixture<MobileapplydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileapplydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileapplydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
