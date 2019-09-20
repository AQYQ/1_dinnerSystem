import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navpc',
  templateUrl: './navpc.component.html',
  styleUrls: ['./navpc.component.scss']
})
export class NavpcComponent implements OnInit {
    userName = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    let siteNav = localStorage.getItem('navActive');
    // 标识有登陆
    if (sessionStorage.getItem('isLoginPc') != '1') {
        this.router.navigate(['./hitejianguan/login']);
    }
    setTimeout( () => {
        console.log(siteNav);
        if (!siteNav) {
            siteNav = 'user';
        }
        $('.' + siteNav).addClass('activeNav');
    }, 0);
  }

  routerClick(site) {
    $('.navLi').removeClass('activeNav');
    localStorage.setItem('navActive', site);
    this.router.navigate(['./hitejianguan/' + site]);
  }

}

