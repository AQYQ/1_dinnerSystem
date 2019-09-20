import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApitoolService } from '../../service/apitool.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-mobileapplydetail',
    templateUrl: './mobileapplydetail.component.html',
    styleUrls: ['./mobileapplydetail.component.scss']
})
export class MobileapplydetailComponent implements OnInit {

    uid: any;         // uid
    myDate: any;      // 当前加班日期 ——————不可修改
    time1 = new Date('October 13, 2019 17:30:00');  // 时间选择框1的  默认时间
    time2 = new Date('October 13, 2019 21:00:00');  // 时间选择框2的  默认时间
    timeFormat = 'HH:mm';                           // 两个时间选择框的  显示格式
    cause: any;           // 加班事由--不能为空
    isShow = false;       // 控制  “未获取到订餐列表（菜单） 的文本提示”  的显示与否
    switchValue = false;  // 控制“是否订餐”开关的开启与关闭 false是关闭状态
    menuList = [];        // 菜单
    timeslot = '17:30-21:00';     // 加班时间区间  --默认 17:30-21:00
    isfood: any;          // 是否订餐 0-不订餐  1-订餐
    foodid = '';          // 某餐饮--id
    oid: any;             // 获取详情的oid
    dataTime = new Date();
    large = 'large';
    load = false; // 定义一个控制两个页面的显示与隐藏的变量
    isYorNnum: any;   // 是否已确认

    constructor(private router: Router,
        public apitool: ApitoolService, private appComponent: AppComponent) { }

    ngOnInit() {
        this.load = true;
        this.uid = localStorage.getItem('userId');  // 页面刷新就 通过localStorage 获取uid
        this.oid = localStorage.getItem('oid');     // 页面刷新就 通过localStorage 获取oid
        console.log('userId:' + localStorage.getItem('userId'));

        // 获取当前加班日期---这是要求的显示格式
        this.myDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
        // 未登录-通过路由跳转到登录页
        if (!localStorage.getItem('userId')) {
            this.router.navigate(['./hitejianguan/applylog']);
        }
        // console.log(this.dataTime.toTimeString());
        if (this.oid) { // 修改
            this.getDetail();
        } else {    // 新建
            this.load = false;
        }
    }

    check_fun(mid) {
        console.log(mid);
        this.foodid = mid;
    }

    // “返回”---通过路由返回到加班列表页
    goBack() {
        this.router.navigate(['./hitejianguan/applylist']);
    }

    // 获取是否已确认
    isYorN(callback) {
        // 这个部分是为了给下面的接口准备参数的
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const timestamp = Date.parse(String(start)) / 1000;
        // 调用接口判断管理端是否已经确认，确认后就不能再更改了
        this.apitool.isconfirm({ 'time': timestamp }, (jsonInfo) => {
            console.log(jsonInfo.data);
            callback(jsonInfo);
            if (jsonInfo.data === '1') {   // 1 代表 --已确认-不可选
                if (this.switchValue  && this.foodid) {
                    console.log('已确认-不可选');
                    this.appComponent.noticePop('已确认,不可选餐'); // 管理端已确认时 调用显示气泡方法警告
                    this.switchValue = false;
                    this.isYorNnum = true;
                }
            }
        });
    }
    // 开关点击方法
    isconfirm() {
        // 第一个判断，判断开关是否选中
        if (this.switchValue) {
            // this.isYorN(() => {});
            const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
            const timestamp = Date.parse(String(start)) / 1000;
            // 调用接口判断管理端是否已经确认，确认后就不能再更改了
            this.apitool.isconfirm({ 'time': timestamp }, (jsonInfo) => {
                console.log(jsonInfo.data);
                if (jsonInfo.data === '1') {   // 1 代表 --已确认-不可选
                    console.log('已确认-不可选');
                    this.appComponent.noticePop('已确认,不可选餐'); // 管理端已确认时 调用显示气泡方法警告
                    this.switchValue = false;
                    this.isYorNnum = true;
                }
            });

            // 开关选中状态时获取一遍订餐列表（菜单）
            this.getMenuList((info) => {
                console.log(info.data);
                if (!info.data.length) {
                    this.isShow = true;
                }
            });
        } else {
            this.isShow = false; // 不管 “getMenuList()”里对isShow做了什么样的改动，只要switchValue开关为false，就让isShow为false  提示文字也就不再显示
        }
    }

    // 申请加班--新建/修改
    applyOvertime() {

        if (!this.cause) {
            this.appComponent.noticePop('请输入加班事由');  // 加班事由为空时  调用显示气泡的方法警告且不让提交
            return;
        }

        if (this.oid) { // 修改
            this.isYorN((jsonInfo) => {
                console.log('修改测试');
                console.log(jsonInfo.data); // 1-代表已确认
                if (jsonInfo.data === '1') {    // 已确认
                    this.appComponent.noticePop('已确认,不可修改');  // 加班事由为空时  调用显示气泡的方法警告且不让提交
                    setTimeout( () => {
                        this.router.navigate(['./hitejianguan/applylist']); // 请求成功，路由跳转到列表页
                    }, 2000);
                    return;
                } else {
                    // 未确认，不做处理，继续
                    console.log('修改--未确认，继续');
                    this.isfood = this.switchValue;     // 是否选餐开关
                    this.isfood ? this.isfood = 1 : this.isfood = 0;
                    this.switchValue ? this.foodid = this.foodid : this.foodid = '';
                    // 提交/修改
                    this.submitFun();
                }
            });
        } else {    // 新建 // 已确认---提示“已确认，不可选餐”---3s提交
            this.isYorN((jsonInfo) => {
                console.log('新建测试');
                console.log(jsonInfo.data); // 1-代表已确认
                if (jsonInfo.data === '1') {    // 已确认
                    console.log('已确认,不可选餐');
                    if (this.foodid) {
                        this.appComponent.noticePop('已确认,不可选餐');
                    }
                    // 不可选餐
                    this.switchValue = false;
                    this.isfood = 0;
                    this.foodid = '';
                    // 提交/修改
                    this.submitFun();
                } else {
                    // 未确认，不做处理，继续
                    this.isfood = this.switchValue;     // 是否选餐开关
                    this.isfood ? this.isfood = 1 : this.isfood = 0;
                    this.switchValue ? this.foodid = this.foodid : this.foodid = '';
                    // 提交/修改
                    this.submitFun();
                }
            });
        }
    }

    // 提交/修改
    submitFun() {
        // 打开选餐开关--未选餐-自动修改为未选餐---继续下一步
        console.log(this.foodid);
        if (!this.foodid) {
            this.switchValue = false;
            this.isfood = 0;
        }

        console.log('foodid==' + this.foodid);
        console.log('isfood==' + this.isfood);

        this.apitool.applyovertime({ 'uid': this.uid, 'time': this.myDate, 'timeslot': this.timeslot,
        'cause': this.cause, 'isfood': this.isfood, 'foodid': this.foodid }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                // console.log('chenggong--去跳转');
                this.router.navigate(['./hitejianguan/applylist']); // 请求成功，路由跳转到列表页
            } else {
                this.appComponent.noticePop('请求出现错误啦');  // 请求失败警告
            }
        });
    }

    // 检查时间选择情况
    log1(): void {
        // console.log(typeof this.timeslot);
        // console.log(this.time1);
        this.timeslot = this.time1.toTimeString().slice(0, 5) + '-' + this.timeslot.toString().slice(6);
        console.log(this.timeslot);
    }
    log2(): void {
        this.timeslot = this.timeslot.toString().slice(0, 5) + '-' + this.time2.toTimeString().slice(0, 5);
        console.log(this.timeslot);
    }

    // 修改，获取申请详情
    getDetail() {
        this.apitool.overtimedetail({ 'uid': this.uid }, (jsonInfo) => {
            console.log(jsonInfo);
            this.cause = jsonInfo.data.o_cause; // 获取上次提交时的加班事由
            const time1Str = jsonInfo.data.o_time_slot.split('-')[0];   // 存上次提交时的加班时间
            const time2Str = jsonInfo.data.o_time_slot.split('-')[1];   // 同上
            this.time1 = new Date('October 13, 2019 ' + time1Str + ':00');  // 拼字符串，让构造函数Date()显示括号里的时间
            this.time2 = new Date('October 13, 2019 ' + time2Str + ':00');  // 同上
            this.timeslot = jsonInfo.data.o_time_slot;
            this.foodid = jsonInfo.data.o_food_id;  // 让选菜选中上次提交的foodid的菜
            // console.log(this.foodid);

            // 判断订餐情况
            if (jsonInfo.data.o_is_food === '1' && this.foodid) {    // 有选菜
                console.log('用户选餐了');
                this.getMenuList(() => {
                    this.switchValue = true;
                });
            }// 无需判断else时的情况，因为任一条件不满足的话，都不需要把开关打开、菜单展开，也不需要自动获取菜单
            this.load = false;
        });
    }

    // 获取订餐列表（菜单）
    getMenuList(callback) {
        this.apitool.getMenuList({ 'uid': '999' }, (jsonInfo) => {
            console.log(jsonInfo);
            console.log(callback);
            if (callback) {
                callback(jsonInfo);
            } else {
                if (!jsonInfo.data.length) {
                    this.isShow = true;        // 接口没有返回数据时，isShow变为true，提示文本显示
                } else {
                    this.isShow = false;
                }
            }
            this.menuList = jsonInfo.data;
        },
        );
    }

}
