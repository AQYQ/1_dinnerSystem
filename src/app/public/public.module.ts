import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { LineComponent } from './line/line.component';
import { PileBarComponent } from './pile-bar/pile-bar.component';
@NgModule({
  imports: [CommonModule, FormsModule, NgxEchartsModule,],
  declarations: [ToastComponent, LineComponent, PileBarComponent],
  exports: [ToastComponent, LineComponent, PileBarComponent],
  providers: [ToastComponent]
})
export class PublicModule { }
