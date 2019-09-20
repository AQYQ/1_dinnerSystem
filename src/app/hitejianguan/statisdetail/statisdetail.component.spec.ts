import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisdetailComponent } from './statisdetail.component';

describe('StatisdetailComponent', () => {
  let component: StatisdetailComponent;
  let fixture: ComponentFixture<StatisdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
