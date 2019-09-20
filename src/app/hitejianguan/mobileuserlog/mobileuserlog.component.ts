import { Component, OnInit } from '@angular/core';
import { ApitoolService } from '../../service/apitool.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-mobileuserlog',
    templateUrl: './mobileuserlog.component.html',
    styleUrls: ['./mobileuserlog.component.scss']
})
export class MobileuserlogComponent implements OnInit {

    userName = '';
    userPassword = '';
    isStrWord = true;  // 默认记住密码
    isAmendWord: any;   // 是否是修改密码
    userId = '';    // 用户id
    oldPassword = '';   // 原密码
    newPassword = '';   // 新密码

    constructor(public apitool: ApitoolService, private router: Router, private appComponent: AppComponent) { }

    ngOnInit() {
        this.userName = localStorage.getItem('username');
        this.userPassword = localStorage.getItem('userPassword');
        this.isAmendWord = localStorage.getItem('isAmendWord');
        this.userId = localStorage.getItem('userId');
    }

    // 点击登录
    goLogin() {
        console.log('用户名==' + this.userName);
        console.log('密码==' + this.userPassword);

        if (this.isStrWord) {   // 记住密码
            localStorage.setItem('username', this.userName);
            localStorage.setItem('userPassword', this.userPassword);
        } else {
            localStorage.setItem('username', '');
            localStorage.setItem('userPassword', '');
        }

        this.apitool.mobileLogin({ 'username': this.userName, 'password': this.userPassword }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                localStorage.setItem('userId', jsonInfo.data.u_id);
                localStorage.setItem('userName', jsonInfo.data.u_name);
                if (jsonInfo.success) {
                    this.router.navigate(['./hitejianguan/applylist']);
                }
            } else {
                if (jsonInfo.message === '登陆失败，此用户没权限登陆') {
                    this.appComponent.noticePop('该账号未授权');
                } else if (jsonInfo.message === '没有此用户') {
                    this.appComponent.noticePop('该账号未注册');
                } else {
                    this.appComponent.noticePop('账号密码错误');
                }
            }
        });
    }

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

    // 返回首页
    goBackList() {
        localStorage.setItem('isAmendWord', '');
        this.router.navigate(['./hitejianguan/applylist']);
    }

    // 确认修改密码
    amendWord() {
        const apiObj = { 'uid': this.userId, 'oldpassword': this.oldPassword, 'newpassword': this.newPassword };
        this.apitool.changepassword( apiObj, (jsonInfo) => {
            if (jsonInfo.success) {
                if (this.userPassword) {   // 记住新密码
                    localStorage.setItem('userPassword', this.newPassword);
                }
                this.appComponent.noticePop('修改成功');
                localStorage.setItem('isAmendWord', '');
                this.router.navigate(['./hitejianguan/applylist']);
            }
        });
    }

}
