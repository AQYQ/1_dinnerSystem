import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { PublicModule } from '../public/public.module';
import { RouterModule, Routes, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../service/auth.service';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { MenuslistComponent } from './menuslist/menuslist.component';
import { StatistlistComponent } from './statistlist/statistlist.component';
import { MobileapplydetailComponent } from './mobileapplydetail/mobileapplydetail.component';
import { MobileapplylistComponent } from './mobileapplylist/mobileapplylist.component';
import { MobileuserlogComponent } from './mobileuserlog/mobileuserlog.component';
import { NavpcComponent } from './navpc/navpc.component';
import { StatisdetailComponent } from './statisdetail/statisdetail.component';


const routes: Route[] = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsermanageComponent },
  { path: 'menus', component: MenuslistComponent },
  { path: 'statis', component: StatistlistComponent },
  { path: 'statisdetail', component: StatisdetailComponent },
  { path: 'applylist', component: MobileapplylistComponent },
  { path: 'applydetail', component: MobileapplydetailComponent },
  { path: 'applylog', component: MobileuserlogComponent },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
    PublicModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
  ],

  declarations: [LoginComponent, UsermanageComponent, MenuslistComponent, StatistlistComponent, MobileapplydetailComponent, MobileapplylistComponent, MobileuserlogComponent, NavpcComponent, StatisdetailComponent]
})
export class HitejianguanModule { }
