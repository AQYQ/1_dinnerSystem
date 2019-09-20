import { Injectable } from '@angular/core';
import { MrequestService } from './mrequest.service';
import { ComtoolService } from '../service/comtool.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApitoolService {
    // 记录跳转url
    redirectUrl: string;
    constructor(private mrequest: MrequestService, public comtool: ComtoolService) {
    }

    // PC端接口 // PC端接口 // PC端接口 // PC端接口 // PC端接口 // PC端接口 // PC端接口 // PC端接口

    // 添加用户
    postAdduser(parames, callback) {
        return this.mrequest.apiPost('api/overtime/adduser', parames, (res) => {
            callback(res);
        });
    }

    // 获取菜单--移动端也用
    getMenuList(parames, callback) {
        return this.mrequest.apiGet('api/overtime/menu', parames, (res) => {
            const data = res;
            callback(data);
        });
    }

    // 添加菜单
    postAddmenu(parames, callback) {
        return this.mrequest.apiPost('api/overtime/addmenu', parames, (res) => {
            callback(res);
        });
    }

    // 删除菜单
    getDeletemenu(parames, callback) {
        return this.mrequest.apiGet('api/overtime/deletemenu', parames, (res) => {
            callback(res);
        });
    }

    // 用户列表--pc
    applyuserlist(parames, callback) {
        return this.mrequest.apiGet('api/overtime/userlist', parames, (res) => {
            callback(res);
        });
    }

    // 用户加班列表--pc
    userovertimelist(parames, callback) {
        return this.mrequest.apiGet('api/overtime/userovertimelist', parames, (res) => {
            callback(res);
        });
    }

    // 用户管理(加班人数列表)
    overtimelist(parames, callback) {
        return this.mrequest.apiGet('api/overtime/overtimelist', parames, (res) => {
            callback(res);
        });
    }

    // 加班人员列表
    peoplelist(parames, callback) {
        return this.mrequest.apiGet('api/overtime/peoplelist', parames, (res) => {
            callback(res);
        });
    }

    // 是否已经确认订餐人员
    isconfirm(parames, callback) {
        return this.mrequest.apiGet('api/overtime/isconfirm', parames, (res) => {
            callback(res);
        });
    }

    // 确认加班人员
    confirm(parames, callback) {
        return this.mrequest.apiGet('api/overtime/confirm', parames, (res) => {
            callback(res);
        });
    }

    // 取消确认
    deleteconfirm(parames, callback) {
        return this.mrequest.apiGet('api/overtime/deleteconfirm', parames, (res) => {
            callback(res);
        });
    }

    // 导出
    download(parames, callback) {
        return this.mrequest.apiGet('api/overtime/download', parames, (res) => {
            callback(res);
        });
    }

    // 导出url
    downloadurl(parames, callback) {
        return this.mrequest.apiGet('api/overtime/downloadurl', parames, (res) => {
            callback(res);
        });
    }

    // 删除用户
    deleteuser(parames, callback) {
        return this.mrequest.apiGet('api/overtime/deleteuser', parames, (res) => {
            callback(res);
        });
    }

    // 上传文件
    upload(parames, callback) {
        return this.mrequest.apiGet('api/overtime/upload', parames, (res) => {
            callback(res);
        });
    }

    // pc端授权
    addauth(parames, callback) {
        return this.mrequest.apiGet('api/overtime/addauth', parames, (res) => {
            callback(res);
        });
    }

    // pc取消端授权
    deleteauth(parames, callback) {
        return this.mrequest.apiGet('api/overtime/deleteauth', parames, (res) => {
            callback(res);
        });
    }

    // pc修改用户信息
    updateuser(parames, callback) {
        return this.mrequest.apiPost('api/overtime/updateuser', parames, (res) => {
            callback(res);
        });
    }

    // 移动端接口 // 移动端接口 // 移动端接口 // 移动端接口 // 移动端接口 // 移动端接口

    // 移动端登录
    mobileLogin(parames, callback) {
        return this.mrequest.apiGet('api/overtime/login', parames, (res) => {
            callback(res);
        });
    }

    // 修改密码
    changepassword(parames, callback) {
        return this.mrequest.apiPost('api/overtime/changepassword', parames, (res) => {
            callback(res);
        });
    }

    // 取消申请--删除
    cancelovertime(parames, callback) {
        return this.mrequest.apiGet('api/overtime/cancelovertime', parames, (res) => {
            callback(res);
        });
    }

    // 申请加班
    applyovertime(parames, callback) {
        return this.mrequest.apiPost('api/overtime/applyovertime', parames, (res) => {
            callback(res);
        });
    }

    // 申请加班-- 详情
    overtimedetail(parames, callback) {
        return this.mrequest.apiGet('api/overtime/overtimedetail', parames, (res) => {
            callback(res);
        });
    }








































}
