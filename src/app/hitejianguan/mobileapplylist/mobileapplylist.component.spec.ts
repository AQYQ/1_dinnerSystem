import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileapplylistComponent } from './mobileapplylist.component';

describe('MobileapplylistComponent', () => {
  let component: MobileapplylistComponent;
  let fixture: ComponentFixture<MobileapplylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileapplylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileapplylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
