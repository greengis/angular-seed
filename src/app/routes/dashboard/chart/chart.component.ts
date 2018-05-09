import {Component, OnDestroy, OnInit} from '@angular/core';
import { AnalogService } from "../../../shared/util/analog.service";
import * as moment from 'moment';

@Component({
  selector: 'app-example-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,OnDestroy {

  option = {
    chart1 : {},
    chart2 : {},
    chart1_data : [],
    chart2_data : []
  };
  subscription = null;

  constructor(private analogService:AnalogService) { }

  ngOnInit() {
    this.option.chart1_data = this.analogService.randomTimeSeries(5, 0.5, 0.2, 288, 0);
    this.option.chart1 = {
      title : {
        text : "流量数据曲线"
      },
      xAxis: {
        type: 'category',
        data: this.option.chart1_data.map( item => moment(item.date).format("HH:mm") )
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'line',
        data: this.option.chart1_data.map( item => item.value )
      }]
    };
    this.option.chart2 = {
      title : {
        text : "动态数据曲线"
      },
      xAxis: {
        type: 'category',
        data: this.option.chart2_data.map( item => moment(item.date).format("HH:mm") )
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.option.chart2_data.map( item => item.value ),
        type: 'line',
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 5,
            shadowOffsetY: 5
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(129, 227, 238)'
          }
        }
      }]
    };
    this.subscription = this.analogService.randomTimeSeriesAsync(5, 0.5, 0.2, 288, 0).subscribe(
        item => {
          this.option.chart2_data.push(item);
          this.option.chart2 = {
            xAxis: {
              type: 'category',
              data: this.option.chart2_data.map( item => moment(item.date).format("HH:mm") )
            },
            series: [{
              data: this.option.chart2_data.map( item => item.value ),
              markPoint : {
                symbolSize : 60,
                symbolRotate : -90,
                label : {
                  position : 'insideRight'
                },
                data : [{
                  name : "当前值",
                  value : item.value ,
                  xAxis : this.option.chart2_data.length-1 ,
                  yAxis : item.value
                }]
              }
            }]
          };
        }
    );
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
