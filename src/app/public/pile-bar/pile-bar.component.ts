import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-pile-bar',
  templateUrl: './pile-bar.component.html',
  styleUrls: ['./pile-bar.component.scss'],
  host: {
    '(window:resize)': 'resetEChart()'
  },
})
export class PileBarComponent implements OnInit {
  @Input() chartData: any; // 父组件传来的值--接收
  chartOption: any;
  echartsIntance: any;
  isBlank = true;

  constructor() { }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartData) {
      this.drawChart();
    }

  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  resetEChart() {
    this.drawChart();
  }

  drawChart() {
    const html = document.querySelector('html');
    const width = html.getBoundingClientRect().width;
    const basesize = width / 1920;
    if (this.echartsIntance) {
      this.echartsIntance.dispatchAction({
        type: 'hideTip',
      });
    }
    // if (this.chartData.data) {
    const that = this;
    this.chartOption = {
      color: ['#3aa0ff', '#4dcb73'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [{ name: '本地', icon: 'circle' }, { name: '远程', icon: 'circle' }],
        itemWidth: basesize * 10,
        right: 0,
        top: 0,
        itemGap: basesize * 40,
        selectedMode: false,
        textStyle: {
          fontSize: basesize * 12 < 12 ? 12 : basesize * 12,
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.chartData.xData,
        axisLine: {
          lineStyle: {
            color: '#D9D9D9'
          }
        },
        axisLabel: {
          fontSize: basesize * 12 < 12 ? 12 : basesize * 12,
          textStyle: {
            color: 'rgba(0,0,0,0.65)', // 坐标值得具体的颜色
          }
        }
        // show:false
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          name: '本地',
          type: 'bar',
          stack: '总量',
          // barWidth: 20,
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          data: this.chartData.yDataLocal
        },
        {
          name: '远程',
          type: 'bar',
          stack: '总量',
          // barWidth: 20,
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          data: this.chartData.yDataremote
        }

      ]
    };
  }


}
