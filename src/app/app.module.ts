import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

import { MrequestService } from './service/mrequest.service';
import { ApitoolService } from './service/apitool.service';
import { ComtoolService } from './service/comtool.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';

import { AppComponent } from './app.component';
import { WindowRef } from './service/window-ref.service';

import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

const routes: Routes = [
  { path: '', redirectTo: 'hitejianguan', pathMatch: 'full' },
  { path: 'hitejianguan', loadChildren: './hitejianguan/hitejianguan.module#HitejianguanModule' },
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MrequestService,
    UserService,
    WindowRef,
    ApitoolService,
    ComtoolService,
    AuthService,
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
