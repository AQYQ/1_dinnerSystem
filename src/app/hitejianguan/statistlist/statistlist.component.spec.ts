import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistlistComponent } from './statistlist.component';

describe('StatistlistComponent', () => {
  let component: StatistlistComponent;
  let fixture: ComponentFixture<StatistlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
