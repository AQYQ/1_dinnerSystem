import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parse } from 'path';
import { ApitoolService } from '../../service/apitool.service';
import { YearPanelComponent } from 'ng-zorro-antd/date-picker/lib/year/year-panel.component';
import { AppComponent } from '../../app.component';


@Component({
    selector: 'app-mobileapplylist',
    templateUrl: './mobileapplylist.component.html',
    styleUrls: ['./mobileapplylist.component.scss']
})
export class MobileapplylistComponent implements OnInit {
    content: any;  // 接收加班人员信息
    userName = '';  // 用户名
    userId = '';    // 用户id
    pagesize = '20'; // 每页显示20条数据
    page = '1';      // 从第一页开始
    isYes: any;   // 是否已确认

    constructor(private router: Router, public apitool: ApitoolService, private appComponent: AppComponent) { }
    ngOnInit() {

        if (!localStorage.getItem('userId')) {
            this.router.navigate(['./hitejianguan/applylog']);  // 跳转到登录页
        }

        this.userName = localStorage.getItem('userName');  // 获取登录用户名
        this.userId = localStorage.getItem('userId');      // 获取用户名id

        const obj = { 'uid': this.userId, 'pagesize': this.pagesize, 'page': this.page };
        this.userovertimelist(obj);

        this.isconfirm();

    }

    // 是否已确认
    isconfirm() {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const timestamp = Date.parse(String(start)) / 1000;
        console.log('timestamp==' + timestamp);
        this.apitool.isconfirm({'time': timestamp}, (jsonInfo) => {
            console.log(jsonInfo);
            jsonInfo.data == '0' ? this.isYes = false : this.isYes = true;
        });
    }

    delestatus(oid) { // 删除申请
        this.apitool.cancelovertime({ 'oid': oid }, (res) => { // 获取此条申请的id
            if (res.success) {
                console.log(res);
                if (res.success) {
                    const obj = { 'uid': this.userId, 'pagesize': this.pagesize, 'page': this.page };
                    this.userovertimelist(obj);  // 再次调用获取加班信息列表方法，重新渲染列表
                    this.appComponent.noticePop('已成功取消');
                }

            }
        })
    }
    xiugai(oid) {  // 修改申请 
        localStorage.setItem('oid', oid);   // 拿到用户的oid
        this.router.navigate(['./hitejianguan/applydetail']);  // 跳转到申请加班页面
    }

    clickJiaban() {   //申请加班
        localStorage.setItem('oid', "");   //将用户oid设置为空
        this.router.navigate(['./hitejianguan/applydetail']); //跳转到申请加班页面
    }
    userovertimelist(obj) {  //获取加班人员信息
        this.apitool.userovertimelist(obj, (res) => { //将用户id，显示条数，当前页数传入
            console.log(res);
            if (res.success) {
                this.content = res.data.alldata;  //接受后台传过来的加班人员信息数据
            }
        });
    }
    update_password() {  //修改密码
        console.log(11111);
    }

    // 修改密码
    amendPassWord() {
        localStorage.setItem('isAmendWord', '1');
        this.router.navigate(['./hitejianguan/applylog']);  // 跳转到申请加班页面
    }
}

