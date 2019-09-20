import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ApitoolService } from '../../service/apitool.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-usermanage',
    templateUrl: './usermanage.component.html',
    styleUrls: ['./usermanage.component.scss']
})
export class UsermanageComponent implements OnInit {
    isVisible = false;
    isModify = false;   // 是否是修改   false-添加单个  true-修改用户信息
    isUserTitle = '请输入用户的数据';   // 弹出框头
    input_userName: any;
    input_userPhone: any;
    // isSure = false;
    // lis: number[]=[];
    uid = '999';
    userId: any;    // 修改用户id
    userArr = [];
    // 上传文件
    domain = 'http://dingcan.hitecloud.net/';   // 后台地址
    recordName: any[] = [];	// 录课名称资源列表
    filePath: any;	// 文件路径
    index: number;	// 文件路径'.'的索引
    startIndex: number;	// 文件名起始索引
    filename: string;	// 文件名
    fileSize: number;	// 文件大小
    audioElement: any;	// 文件元素
    total: number;	// 文件总时长
    minutes: number;	// 文件分钟数
    seconds: number;	// 文件秒钟数
    videoItems: any;	// 视屏列表资源
    pageIndex = 1; // 分页
    allpagenumber: any; // 页数
    constructor(public apitool: ApitoolService, private router: Router, private appComponent: AppComponent) { }

    ngOnInit() {
        // 标识有登陆
        // if (sessionStorage.getItem('isLoginPc') != '1') {
        //     this.router.navigate(['./hitejianguan/login']);
        // }
        this.userList(this.uid, 1);
    }

    showModal(): void {
        this.isUserTitle = '请输入用户的数据';
        this.input_userName = '';
        this.input_userPhone = '';
        this.isModify = false;
        this.isVisible = true;
    }

    handleOk(): void {
        console.log(this.input_userName);
        console.log(this.input_userPhone);
        if (this.isModify) {    // 修改
            console.log('修改用户信息!');
            this.updateuserFun(this.userId, this.input_userName, this.input_userPhone);
        } else {    // 添加单个
            console.log('添加单个!');
            this.isVisible = false;
            this.addUser(this.input_userName, this.input_userPhone);
        }
        this.isVisible = false;
        // this.lis.push(this.lis.length);
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    // 添加用户
    addUser(name, username) {
        this.apitool.postAdduser({ 'name': name, 'username': username }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                this.input_userName = '';
                this.input_userPhone = '';
                this.userList(this.uid, this.pageIndex);
                this.appComponent.noticePop('添加成功');
            } else {
                this.appComponent.noticePop('添加失败');
            }
        });
    }

    // 用户列表
    userList(uid, page) {
        this.apitool.applyuserlist({ 'uid': uid, 'pagesize': 10, 'page': page }, (jsonInfo) => {
            console.log(jsonInfo);
            this.userArr = jsonInfo.data.alldata;
            this.allpagenumber = jsonInfo.data.pages.allpagenumber * 10;
        });
    }

    // 删除用户
    deleteUser(uid, delete_uid) {
        this.apitool.deleteuser({ 'uid': uid, 'delete_uid': delete_uid }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                this.userList(this.uid, 1);
                this.pageIndex = 1;
                this.appComponent.noticePop('用户已删除');
            }  else {
                this.appComponent.noticePop('为删除成功');
            }
        });
    }

    // 上传文档
    getUploadFile(e) {
        this.filePath = $('#myfile').val();	// 文件路径
        // 检测文件大小
        this.fileSize = e.target.files[0].size;
        // console.log('文件路径:' + this.filePath);
        this.index = this.filePath.lastIndexOf('.');
        // 获取文件名
        this.startIndex = this.filePath.lastIndexOf('\\');
        this.filename = this.filePath.slice(this.startIndex + 1);
            const fileObj = e.target.files[0];
            const formFile = new FormData();
            formFile.append('action', 'UploadVMKImagePath');
            formFile.append('file', fileObj); // 加入文件对象
            formFile.append('uid', '999'); // 加入文件对象
            const data = formFile;
            $.ajax({
                // url: 'http://iclass.hitecloud.net/api/wlassrecord/classvideo',
                url: this.domain + 'api/open/uploadfile',
                data: data,
                type: 'Post',
                dataType: 'json',
                cache: false, // 上传文件无需缓存
                processData: false, // 用于对data参数进行序列化处理 这里必须false
                contentType: false, // 必须
                success: (result) => {
                    console.log('上传成功');
                    console.log(result);
                    this.userList(this.uid, this.pageIndex);
                    this.appComponent.noticePop('批量添加成功');
                },
                error: (e) => {
                    console.log('上传失败');
                    this.appComponent.noticePop('批量添加失败');
                    console.log(e);
                }
            });
    }


    // // 分页
    pageIndexChange() {
        console.log(this.pageIndex);
        // 用户列表
        this.userList(this.uid, this.pageIndex);
    }

    // 授权
    addAuth(userId) {
        this.apitool.addauth({ 'uid': userId }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                console.log('授权成功');
                this.appComponent.noticePop('授权成功');
                this.userList(this.uid, this.pageIndex);
            } else {
                this.appComponent.noticePop('授权失败');
            }
        });
    }

    // 取消授权
    deleteAuth(userId) {
        this.apitool.deleteauth({ 'uid': userId }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                console.log('取消授权成功');
                this.appComponent.noticePop('已取消授权');
                this.userList(this.uid,  this.pageIndex);
            } else {
                this.appComponent.noticePop('取消授权失败');
            }
        });
    }

    // 修改用户信息
    updateuser(userid, userName, userPhone) {
        this.userId = userid;
        this.isUserTitle = '修改用户信息';
        this.input_userName = userName;
        this.input_userPhone = userPhone;
        this.isModify = true;
        this.isVisible = true;
    }

    // 确认修改用户信息
    updateuserFun(userid, userName, userPhone) {
        this.apitool.updateuser({ 'uid': userid, 'name': userName, 'username': userPhone }, (jsonInfo) => {
            console.log(jsonInfo);
            if (jsonInfo.success) {
                console.log('修改用户信息成功');
                this.appComponent.noticePop('修改用户信息成功');
                this.userList(this.uid,  this.pageIndex);
            } else {
                this.appComponent.noticePop('修改失败');
            }
        });
    }


}
