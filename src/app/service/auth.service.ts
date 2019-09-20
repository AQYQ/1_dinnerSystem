import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginAuthService } from './login-auth.service';
import { ApitoolService } from './apitool.service';
import { UserService } from './user.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { MrequestService } from './mrequest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  loginSubscription$: Subscription;
  public statusInfo$ = new Subject<any>();
  constructor(public router: Router,
    public apitool: ApitoolService,
    public mrequest: MrequestService,
    public userService: UserService, ) { }

  // canActivate(): Promise<boolean> {
  //   return this.mrequest.apiGetPromise('api/members/authorrole', {});
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return new Observable(observer => {});

  }

}