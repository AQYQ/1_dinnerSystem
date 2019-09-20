import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  host: {
    '(window:resize)': 'resetEChart()'
  },
})
export class LineComponent implements OnInit {
  @Input() chartData: any; // 父组件传来的值--接收
  chartOption: any;
  echartsIntance: any;
  isBlank = true;

  constructor() { }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  resetEChart() {
    this.drawChart();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartData) {
      this.drawChart();
    }

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
      color: '#3C96FF',
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100,
        zoomOnMouseWheel: this.chartData.type ? false : true,
      },
      {
        show: this.chartData.type ? false : true,
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        height: basesize * 24,
        bottom: basesize * 20,
        textStyle: {
          fontSize: basesize * 12 < 12 ? 12 : basesize * 12,
        }
      }],
      tooltip: {
        show: true,
        tigger: 'axis',
        padding: [8, 30, 8, 12],
        formatter: function (params) {
          return params.data.year + "-" + params.name + '<br/>' + params.seriesName + "  " + parseInt(params.value, 10).toLocaleString();
        },
      },
      grid: {
        left: this.chartData.type ? basesize * 5 : basesize * 100,
        bottom: this.chartData.type ? basesize * 5 : basesize * 90,
        top: this.chartData.type ? basesize * 5 : basesize * 10,
        right: this.chartData.type ? basesize * 5 : basesize * 110
      },
      xAxis: {
        show: this.chartData.type ? false : true,
        type: 'category',
        boundaryGap: false,
        offset: basesize * 10,
        data: this.chartData.xData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: basesize * 12 < 12 ? 12 : basesize * 12,
          // formatter: (value, index) => {
          //   return value + " " + this.chartData.week[index];
          // }
        }
      },
      yAxis: {
        show: this.chartData.type ? false : true,
        type: 'value',
        offset: basesize * 10,
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: basesize * 12 < 12 ? 12 : basesize * 12
        }
      },
      series: [{
        name: this.chartData.title,
        data: this.chartData.yData,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: basesize * 4,
        showSymbol: this.chartData.type ? false : true,
        areaStyle: {
          color: this.chartData.color ? "#fff" : "#ebf4ff"
        },
        lineStyle: {
          color: this.chartData.color ? this.chartData.color : "#3C96FF",
          width: basesize * 4
        }
      }]
    };
  }


}
