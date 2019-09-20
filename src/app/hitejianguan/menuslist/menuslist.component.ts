import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { ApitoolService } from '../../service/apitool.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-menuslist',
    templateUrl: './menuslist.component.html',
    styleUrls: ['./menuslist.component.scss']
})
export class MenuslistComponent implements OnInit {
    tags = [];
    inputVisible = false;
    inputValue = '';
    @ViewChild('inputElement') inputElement: ElementRef;

    constructor(public apitool: ApitoolService, private appComponent: AppComponent) { }

    ngOnInit() {
        // 获取菜单
        this.getMenu('999');
    }

    handleClose(removedTag: {}): void {
        this.tags = this.tags.filter(tag => tag !== removedTag);
        console.log(removedTag);
        this.deteleMenu('999', removedTag['m_id']);
    }

    // sliceTagName(tag: string): string {
    //     const isLongTag = tag.length > 20;
    //     return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    // }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        }, 10);
    }

    handleInputConfirm(): void {
        // if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
        //     this.tags = [...this.tags, {'m_id': '99', 'm_name': this.inputValue}];
        // }
        // 添加菜单
        this.addMenu('999', this.inputValue);
        console.log(this.inputValue);
        this.inputValue = '';
        this.inputVisible = false;
    }


    // 获取菜单
    getMenu(uid) {
        console.log(1,uid)
        this.apitool.getMenuList({ 'uid': uid }, (jsonInfo) => {
            if(jsonInfo.success){
                this.tags = [];
                this.tags= jsonInfo.data;
                // console.log(this.tags,99);
                console.log(jsonInfo);
            }
        }); 
    }

    // 添加菜单
    addMenu(uid, name) {
        this.apitool.postAddmenu({ 'uid': uid, 'name': name}, (jsonInfo) => {
            console.log(jsonInfo);
            this.getMenu('999');
            this.appComponent.noticePop('添加成功');
        });
    }

    // 删除菜单
    deteleMenu(uid, mid) {
        this.apitool.getDeletemenu({ 'uid': uid, 'food_id': mid}, (jsonInfo) => {
            console.log(jsonInfo);
            this.appComponent.noticePop('已成功删除');
        });
    }

}
