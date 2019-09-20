import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { WindowRef } from '../service/window-ref.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { MrequestService } from './mrequest.service';
import {Router} from '@angular/router';

@Injectable()
export class ComtoolService {
  user: User;
  public network: number = 1; // 0 无外网 1有外网
  public usernetwork: number = 1; // 1 登录有网  2有网未登录  3 无网
  domain: string; // 域名
  constructor(public router: Router, private winRef: WindowRef, private userservice: UserService, private mrequest: MrequestService) {
    this.user = userservice.userInfo;
    this.domain = environment.domain;
  }
  init() {
     this.winRef.nativeWindow['ComtoolService'] = this;
  }

  /**
   * date: js date
   * format： yyyy-MM-dd
   */
  dateformat(date, format) {
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  }

 /**
    * 获取是否有外网（网络每次变化杜伟调用）
    * 0 无外网 1有外网
    */
   networkStatus(response) {
    const oldNetwork = this.network;
    this.network = parseInt(response);
    
    return this.network;
  }
  getNetworkStatus() {
    return this.network;
  }
  // angular跳转
  redirectUrl(path, params = {}) {
    this.router.navigate([path], { skipLocationChange: false, queryParams: params });
  }
  // 生成x轴坐标
  generatrXData(level, length) {
    let prefix = '';
    if (level === '') {
      prefix = '省份';
    } else if (level === 'province') {
      prefix = '地市';
    } else if (level === 'city') {
      prefix = '区县';
    }
    const xData = new Array();
    for (let index = 0; index < length; index++) {
      xData.push(prefix + (index + 1));
    }
    return xData;
  }
}
