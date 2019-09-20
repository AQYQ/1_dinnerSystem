import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationStart } from '@angular/router';
import { ApitoolService } from './service/apitool.service';
import { environment } from '../environments/environment';
import { Subscription } from 'rxjs';
import { WindowRef } from './service/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    '(window:resize)': 'setHtml()'
  },
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hitekanban';
  domain: any;
  show: boolean = false;
  userSubscription$: Subscription;
  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    public apitool: ApitoolService,
    public router: Router,
    private winRef: WindowRef,
  ) {
    // this.domain = environment.domain;
    // const loginurl = this.domain + 'kb/#/hitekanban/login'; // 登录url
    // // const loginurl = 'http://localhost:4200/#/hitekanban/login'; // 登录url
    // const url = window.document.location.href.toString(); // 当前url
    // this.checkRole(url, loginurl, true);

    // this.router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event instanceof NavigationStart) {
    //       const eventUrl = event.url;
    //       // if (eventUrl.indexOf('login') === -1) {
    //       //   // this.checkRole(event.url, loginurl, false);
    //       // }
    //     }
    //   });
  }

  ngOnInit() {
    this.setHtml();
    this.winRef.nativeWindow['appcomp'] = this;
  }

  setHtml() {
    const initUrl = window.document.location.href.toString();
    this.setHtmlFontSize();
  }

  setHtmlFontSize() {
    const html = document.querySelector('html');
    const width = html.getBoundingClientRect().width;
    html.style.fontSize = width / 80 + 'px';
    html.style.background = '#f5f5f5';
  }

  // checkRole(url, loginurl, refresh) {
  //   if (url.indexOf('findpsw') < 0 && url.indexOf('apply') < 0) {
  //     this.apitool.getrole({}, (roledata) => {
  //       if (roledata.success) {
  //         if (roledata.data.code === 1) {
  //           const avatar = localStorage.getItem('avatar');
  //           roledata.data.data['avatar'] = avatar;
  //           this.userservice.setUserInfo(roledata.data.data);
  //           if (refresh) {
  //             if (url.indexOf('login') > 0) { // 如果有登录信息，进入到登录页面之后跳转到首页
  //               window.location.href = this.domain + 'kb/#/hitekanban/user';
  //               // window.location.href = 'http://localhost:4200/#/hitekanban/user';
  //             }
  //           }
  //         } else {
  //           window.location.href = loginurl;
  //         }
  //       } else {
  //         window.location.href = loginurl;
  //       }
  //     });
  //   }
  // }

  noticePop(title, delaytime = 1000) {
    console.log('toast--------------' + title);
    const obj = this;
    // this.title = title;
    $('#msgtip').html(title);
    this.show = true;
    setTimeout(function () {
      obj.show = false;
    }, delaytime);
  }
}
