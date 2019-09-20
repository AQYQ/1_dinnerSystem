import { Component, OnInit } from '@angular/core';
import { ApitoolService } from '../../service/apitool.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistlist',
  templateUrl: './statistlist.component.html',
  styleUrls: ['./statistlist.component.scss'],

})
export class StatistlistComponent implements OnInit {
  alldata: any;
  obj: any;
  constructor(public apitool: ApitoolService, private router: Router) { }

  ngOnInit() {
    this.obj = { 'uid': '999', pagesize: 20, page: 1 };
    this.getUserovertimeList(this.obj);
    this.alldata = [];
  }
  onClickDetail(time) {
    console.log('去详情');
    console.log(time);
    localStorage.setItem('timeId', time);
    this.router.navigate(['./hitejianguan/statisdetail']);
  }

  // 用户加班列表
  getUserovertimeList(obj) {
    console.log('用户加班列表')
    this.apitool.overtimelist(obj, (jsonInfo) => {
      console.log(jsonInfo)
      this.alldata = jsonInfo.data.alldata;
    });
  }

}
