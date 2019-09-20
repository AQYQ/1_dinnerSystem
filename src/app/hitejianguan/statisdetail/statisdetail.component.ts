import { Component, OnInit } from '@angular/core';
import { ApitoolService } from '../../service/apitool.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-statisdetail',
  templateUrl: './statisdetail.component.html',
  styleUrls: ['./statisdetail.component.scss']
})


export class StatisdetailComponent implements OnInit {
  alldata: any;
  detail: any;
  pages: any;
  obj: any;   // 请求接口数据
  allpagenumber: any; // 总页数
  pageIndex = 1;  // 页数
  isShow = false; // 是否显示分页
  timeid = localStorage.getItem('timeId');
  goback = '<返回';
  isYes: any;   // 是否已确认
  isVisible = false;

  constructor(public apitool: ApitoolService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    // 获取时间 -localStorage
    console.log(localStorage.getItem('timeId'));
    this.obj = { 'uid': '999', time: this.timeid, pagesize: 10, page: 1 };
    this.getPeopleList(this.obj);
    this.pages = [{ pagesize: 10, page: 1, allpagenumber: 1}];
    this.alldata = [];
    this.detail = [];
    this.isconfirm(this.timeid);   // 是否已确认
  }

  // 是否已确认
  isconfirm(dataTime) {
      console.log('dataTime==' + dataTime);
    this.apitool.isconfirm({'time': dataTime}, (jsonInfo) => {
        console.log(jsonInfo);
        jsonInfo.data == '0' ? this.isYes = false : this.isYes = true;
    });
  }

  // 导出
  downloadurl(uid) {

    this.apitool.downloadurl({ 'uid': uid, 'time': this.timeid }, (jsonInfo) => {
      console.log('导出');
      this.appComponent.noticePop('已成功导出');
      window.open(jsonInfo.data, '_self');
    });
  }

  // 确认
  confirm() {
    this.isVisible = true;
  }

  // 确定确认
  handleOk(uid) {
    this.apitool.confirm({ 'uid': uid, 'time': this.timeid }, (jsonInfo) => {
        console.log('确认');
        this.isYes = true;   // 是否已确认
        this.appComponent.noticePop('确认成功');
        console.log(jsonInfo);
        this.isVisible = false;
      });
  }

  // 取消确认接口
  deleteconfirm() {
    this.apitool.deleteconfirm({ 'uid': '999', 'time': this.timeid }, (jsonInfo) => {
        console.log('取消成功');
      });
  }

  // 取消确认
  handleCancel() {
    this.isVisible = false;
  }

  // 已确认
  confirm2() {
    this.appComponent.noticePop('已确认');
  }

  // 用户管理（加班人数列表）
  getPeopleList(obj) {
    console.log('用户管理');
    this.apitool.peoplelist(obj, (jsonInfo) => {
        console.log(jsonInfo);
        this.allpagenumber = jsonInfo.data.pages.allpagenumber * 10;
        this.alldata = jsonInfo.data.alldata;
        this.detail = jsonInfo.data.detail;
        console.log(this.alldata);
        console.log(this.allpagenumber);
    });
  }

  // 分页
  getData() {
    console.log(this.pageIndex);
    this.obj = { 'uid': '999', time: this.timeid, pagesize: 10, page: this.pageIndex };
    this.getPeopleList(this.obj);
  }

  // 返回列表
  gobackFun() {
    this.router.navigate(['./hitejianguan/statis']);
  }

}

