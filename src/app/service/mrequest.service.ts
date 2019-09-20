import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from '../service/window-ref.service';
import { UserService } from './user.service';

// import {
//   Http,
//   Response,
//   RequestOptions,
//   Headers
// } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class MrequestService {
    // www域名
    domain: string;
    data: Object;
    mtoken: string;
    mcache = 1; // 0无缓存 1：缓存1小时 2：1天
    sessionkey = 'phpclient';

    constructor(private http: HttpClient, public route: ActivatedRoute,
        private winRef: WindowRef,
        public router: Router,
        private userservice: UserService, ) {
        this.domain = environment.domain;
    }

    getMcache(key: string, mcache: number) {
        // mcache = 3;//dxxtest
        if (mcache == 0) {
            return false;
        }
        console.log('getMcache');
        let settime: any = window.localStorage.getItem(key);
        if (!settime) {
            return false;
        }
        let setcon = window.localStorage.getItem(key + '_con');
        if (!setcon) {
            return false;
        }

        let timenow = Date.parse(new Date() + "") / 1000;

        if (mcache == 1 && timenow - settime < 3600) {
            return JSON.parse(setcon);
        }

        if (mcache == 2 && timenow - settime < 3600 * 24) {
            return JSON.parse(setcon);
        }

        if (mcache == 3) {
            return JSON.parse(setcon);
        }
        window.localStorage.removeItem(key + '_con');
        window.localStorage.removeItem(key);

    }

    setMcache(key: string, mcache: number, con: any) {
        //console.log(this);
        if (!con || (con && con.success == false)) {
            return false;
        }

        //mcache = 3;//dxxtest
        if (mcache == 0) {
            return false;
        }
        console.log('setMcache');
        console.log(key + mcache);
        console.log(con);

        let nowtime = Date.parse(new Date() + "") / 1000;
        try {
            window.localStorage.setItem(key, nowtime + "");
            window.localStorage.setItem(key + '_con', JSON.stringify(con));

        } catch (oException) {
            window.localStorage.clear();
            window.localStorage.setItem(key, nowtime + "");
            window.localStorage.setItem(key + '_con', JSON.stringify(con));
        }
    }

    getToken(): string {
        if (!this.mtoken) {
            return this.setToken();
        }
        return this.mtoken;
    }

    setToken(): string {
        let obj = this.getReqParams();
        //console.log(obj);
        if (obj && obj.mtoken) {
            //window.localStorage.clear();
            this.mtoken = obj.mtoken;
            window.localStorage.setItem('t-token', this.mtoken);
        } else {
            console.log('localtoken');
            let dbtoken = window.localStorage.getItem('t-token');
            if (dbtoken) {
                this.mtoken = dbtoken;
            }
        }

        return this.mtoken;
    }

    /**
     * header添加token方式调用接口
     */
    makePost(uri, params: Object, callback, mcache = 0): any {
        //mcache = 3;//dxxtest
        let mkey = uri + JSON.stringify(params);
        let mcachestr = this.getMcache(mkey, mcache);
        if (mcachestr) {
            callback(this.makeResObj(mcachestr));
            return false;
        }
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('M-Token', this.getToken());

        //let opts: httpOptions = new httpOptions();
        //opts.headers = headers;
        const opts = { headers: headers };

        let setMcache = this.setMcache;
        return this.http.post(
            this.domain + uri,
            JSON.stringify(params), opts)
            .subscribe(res => {
                callback(res);
                setMcache(mkey, mcache, res);
            }

                , (err: any) => { // on error
                    console.log(err);

                },
                () => { // on completion

                });
    }

    makeResObj(data) {
        return {
            data: data,
            json: function () {
                return this.data
            }
        };

    }

    /*
    * header添加token方式调用接口
    */
    makeGet(uri, params: Array<any>, callback, mcache = 0): any {
        //mcache = 3;
        let mkey = uri + JSON.stringify(params);

        let mcachestr = this.getMcache(mkey, mcache);

        if (mcachestr) {
            callback(this.makeResObj(mcachestr));
            return false;
        }

        // let headers: HttpHeaders = new HttpHeaders();
        // headers.append('M-Token', this.getToken());

        // let opts: httpOptions = new httpOptions();
        // opts.headers = headers;
        let paramsok: string = params.join('&');
        const opts = {
            headers: new HttpHeaders({
                'M-Token': this.getToken(),
            })
        };
        console.log(opts);
        let setMcache = this.setMcache;
        return this.http.get(`${this.domain}${uri}?${paramsok}`, opts)
            .subscribe(res => {
                callback(res);
                setMcache(mkey, mcache, res);
            }
                , (err: any) => { // on error
                    console.log(err);
                    // this.winRef.nativeWindow['appcomp'].noticePop('当前无网络连接，请连网后重试');
                },
                () => { }

            )
    }

    getReqParams(): any {
        var url = window.document.location.href.toString();
        var u = url.split("?");
        var theRequest = {};
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            for (var i in u) {
                var j = u[i].split("=");
                theRequest[j[0]] = j[1];
            }
        }
        return theRequest;
    }

    // 是否在数组内
    inArr(str: any, arr: Array<any>): any {

        for (let x in arr) {
            if (arr[x] == str) {
                return arr[x];
            }
        }

        return false;
    }

    // 判空
    isEmpty(value, allowEmptyString = false) {
        return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || ($.isArray(value) && value.length === 0);
    }

    //得到url签名
    getSign(params) {
        var appkey = '52f4133a5d45';
        var timestamp = new Date().getTime();
        var times = timestamp.toString();//一定要转换字符串

        params.resttime = Math.floor(Number(times) / 1000);
        params = this.valuesSort(params);
        params = this.switchUpper(params);

        //对所有需要传入的参数加上appkey作一次key＝value字典序的排序
        //alert(params);
        var keyvaluestring = params + '&' + appkey;
        //alert(keyvaluestring);
        //对排序后的参数进行MD5加密
        var sign = Md5.hashStr(keyvaluestring).toString();
        return sign;
    }
    // hitecloud的签名
    getHiteSign(params) {
        var appkey = '52f4133a5d45';
        var timestamp = new Date().getTime();
        var times = timestamp.toString();//一定要转换字符串

        params.resttime = Math.floor(Number(times) / 1000);
        params = this.valuesSort(params);
        params = this.switchUpper(params);

        //对所有需要传入的参数加上appkey作一次key＝value字典序的排序
        //alert(params);
        var keyvaluestring = params + '&' + appkey;
        //alert(keyvaluestring);
        //对排序后的参数进行MD5加密
        var sign = Md5.hashStr(keyvaluestring).toString();
        return sign;
    }

    //对值进行排序
    valuesSort(params) {
        var keys = [], name;
        for (name in params) {
            if (params.hasOwnProperty(name)) {
                keys.push(name);
            }
        }
        keys = keys.sort();
        var no = {};
        for (var i = 0; i < keys.length; i++) {
            no[keys[i]] = params[keys[i]];
        }
        return no;
    }

    switchUpper(params) {
        var str = '';
        for (var t in params) {
            if (typeof (params[t]) === 'string' || typeof (params[t]) === 'number' || typeof (params[t]) === 'boolean') {
                str += this.urlencode(t) + '=' + this.urlencode(params[t]) + '&';
            } else if (params[t] !== null && typeof (params[t]) === 'object') {
                str += this.switchUpperObject(params[t], t) + '&';
            }
        }
        return str.substring(0, str.lastIndexOf('&'));
    }

    switchUpperObject(params, name) {
        var str = '';
        params = this.valuesSort(params);
        for (var t in params) {
            if (typeof (params[t]) === 'string' || typeof (params[t]) === 'number' || typeof (params[t]) === 'boolean') {
                str += this.urlencode(name + '[' + t + ']') + '=' + this.urlencode(params[t]) + '&';
            } else if (typeof (params[t]) === 'object') {
                str += this.switchUpperObject(params[t], name + '[' + t + ']') + '&';
            }
        }
        str = str.substring(0, str.lastIndexOf('&'));
        return str;
    }

    // url特殊字符替换
    urlencode(str) {
        str = encodeURIComponent(str);
        str = str.replace(/\!/g, "%21");
        str = str.replace(/\*/g, "%2A");
        str = str.replace(/\(/g, "%28");
        str = str.replace(/\)/g, "%29");
        str = str.replace(/\'/g, "%27");
        str = str.replace(/\~/g, "%7E");
        return str.replace(/%20/g, '+');
    }

    // api调用
    apiGet(uri, params: Object, callback, mcache = 0): any {
        let mkey = uri + JSON.stringify(params);

        let mcachestr = this.getMcache(mkey, mcache);

        if (mcachestr) {
            callback(this.makeResObj(mcachestr));
            return false;
        }

        // var params1 = params;
        // 生成auth字符串并添加到params中
        params['sessionkey'] = this.sessionkey;
        // console.log(params);
        let restauth = this.getSign(params);
        // console.log(params);
        let paramsok: string = this.switchUpper(params);

        let setMcache = this.setMcache;
        return this.http.get(`${this.domain}${uri}?${paramsok}&restauth=${restauth}`)
            .subscribe(res => {
                callback(res);
                setMcache(mkey, mcache, res);
            }
                , (err: any) => { // on error
                    if (err.status === 401 || err.status === 500) {
                        this.winRef.nativeWindow['appcomp'].noticePop('服务异常，稍后重试');
                    } else {
                        window.location.reload();
                    }
                    // alert("当前无网络连接，请连网后重试");
                    // window.location.reload()
                    // this.winRef.nativeWindow['appcomp'].noticePop('当前无网络连接，请连网后重试');
                },
                () => { }
            )
    }

    // api调用
    apiPost(uri, params: Object, callback, mcache = 0): any {
        let mkey = uri + JSON.stringify(params);
        let mcachestr = this.getMcache(mkey, mcache);
        if (mcachestr) {
            callback(this.makeResObj(mcachestr));
            return false;
        }

        //生成auth字符串并添加到params中
        var authparams = {};
        params['sessionkey'] = this.sessionkey;
        params['restauth'] = this.getSign(params);
        let paramsok: string = this.switchUpper(params);

        let setMcache = this.setMcache;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }); //其实不表明 json 也可以, ng 默认好像是 json
        let options = { headers: headers };

        return this.http.post(`${this.domain}${uri}`, paramsok, options)
            .subscribe(res => {
                callback(res);
                setMcache(mkey, mcache, res);
            }
                , (err: any) => { // on error
                    if (err.status === 401 || err.status === 500) {
                        this.winRef.nativeWindow['appcomp'].noticePop('服务异常，稍后重试');
                    } else {
                        window.location.reload();
                    }
                    // this.winRef.nativeWindow['appcomp'].noticePop('当前无网络连接，请连网后重试');
                },
                () => { // on completion

                });
    }

    getLocalData(key: string) {
        const setcon = window.localStorage.getItem(key + '_local');
        if (!setcon) {
            return false;
        }
        return JSON.parse(setcon);
    }

    setLocalData(key: string, con: any) {
        if (!con || (con && con.success === false)) {
            return false;
        }

        try {
            window.localStorage.setItem(key + '_local', JSON.stringify(con));
        } catch (oException) {
            window.localStorage.clear();
            window.localStorage.setItem(key + '_local', JSON.stringify(con));
        }
    }

}
