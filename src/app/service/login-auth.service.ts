import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApitoolService } from './apitool.service';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  private headers = new Headers({'Content-Type': 'application/json;'});
  private options = new RequestOptions({ headers: this.headers });
  public statusInfo$ = new Subject<any>();
  constructor(
    public apitool: ApitoolService,
    private userservice: UserService,
  ) {
  }
  // 是否登录
  public isLogin() {
    
  }

  public checkLogin() {
    this.isLogin();
    return this.statusInfo$.asObservable();
  }
}
