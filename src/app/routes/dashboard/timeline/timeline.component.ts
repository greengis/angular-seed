import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-example-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  records = [
    {
      user : '张三',
      date : moment().subtract(7 , 'days').toDate(),
      desc : "执行工单",
      status : "作业前",
      address : "金地格林小镇"
    },
    {
      user : '张三',
      date : moment().subtract(6 , 'days').toDate(),
      desc : "执行工单",
      status : "作业后",
      address : "天宝中街"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
