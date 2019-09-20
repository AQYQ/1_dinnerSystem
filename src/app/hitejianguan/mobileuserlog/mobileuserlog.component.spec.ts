import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileuserlogComponent } from './mobileuserlog.component';

describe('MobileuserlogComponent', () => {
  let component: MobileuserlogComponent;
  let fixture: ComponentFixture<MobileuserlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileuserlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileuserlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
