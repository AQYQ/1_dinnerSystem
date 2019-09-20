import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApitoolService } from '../../service/apitool.service';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { MrequestService } from '../../service/mrequest.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    userName: any;
    userPassword: any;
    isShow = false;

    isStrWord = true;  // 默认记住密码
    isAmendWord: any;   // 是否是修改密码
    userId = '';    // 用户id

    constructor(
        public apitool: ApitoolService,
        public userservice: UserService,
        public mrequest: MrequestService,
        private router: Router,
        private app: AppComponent
    ) { }

    ngOnInit() {
        this.userName = localStorage.getItem('username');
        this.userPassword = localStorage.getItem('userPassword');
    }
    ngOnDestroy() { }

    // 点击记住密码
    clickStrWord() {
        console.log('点击记住密码');
        if (this.isStrWord) {   //  刚才是选中
            this.isStrWord = false;
            $('.storageWord').removeClass('green');
        } else {    // 刚才未选中
            this.isStrWord = true;
            $('.storageWord').addClass('green');
        }
        console.log('是否记住密码==' + this.isStrWord);
    }

    // 点击登录
    goLoginPc() {
        console.log('用户名==' + this.userName);
        console.log('密码==' + this.userPassword);

        localStorage.setItem('navActive', '');

        if (this.isStrWord) {   // 记住密码
            localStorage.setItem('username', this.userName);
            localStorage.setItem('userPassword', this.userPassword);
        } else {
            localStorage.setItem('username', '');
            localStorage.setItem('userPassword', '');
        }

        const logObj = { 'username': this.userName, 'password': this.userPassword, 'type': 'pc' };
        this.apitool.mobileLogin(logObj, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                sessionStorage.setItem('isLoginPc', '1'); // 标识有登陆
                localStorage.setItem('userName', jsonInfo.data.u_name);
                this.router.navigate(['./hitejianguan/user']);
            } else {
                if (jsonInfo.message === '登陆失败，此用户没权限登陆') {
                    this.app.noticePop('该账号未授权');
                } else if (jsonInfo.message === '没有此用户') {
                    this.app.noticePop('该账号未注册');
                } else {
                    this.app.noticePop('账号密码错误');
                }
                sessionStorage.setItem('isLoginPc', '');  // 标识没有登陆
                this.isShow = true;
            }
        });
    }
}
