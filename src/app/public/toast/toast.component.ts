import { Component, OnInit, Input, OnChanges , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Output() toastshowChange = new EventEmitter();
  @Input() toast_title: string;
  @Input() toast_delaytime: number;
  @Input() toast_show: boolean;

  constructor() { }

  ngOnInit() {

  }
  ngOnChanges() {
    if(this.toast_show){
      let obj = this;
      setTimeout(function(){
          obj.toast_show = false;
          obj.toastshowChange.emit(false);
      }, obj.toast_delaytime);
    }

  }

}
