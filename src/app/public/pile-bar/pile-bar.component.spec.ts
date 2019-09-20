import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileBarComponent } from './pile-bar.component';

describe('PileBarComponent', () => {
  let component: PileBarComponent;
  let fixture: ComponentFixture<PileBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PileBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
