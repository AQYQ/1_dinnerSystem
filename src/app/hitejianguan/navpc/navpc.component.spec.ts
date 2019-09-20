import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NavpcComponent } from './navpc.component';

describe('NavpcComponent', () => {
  let component: NavpcComponent;
  let fixture: ComponentFixture<NavpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'nz-demo-menu-horizontal',
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item nzSelected>
        <i nz-icon nzType="mail"></i>
        用户管理
      </li>
    </ul>
  `
})
export class NzDemoMenuHorizontalComponent {}
