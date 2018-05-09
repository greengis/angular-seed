import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-example-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  record = {
      user : '张三',
      date : moment().subtract(7 , 'days').toDate(),
      desc : "执行工单",
      status : "作业前",
      address : "金地格林小镇"
  };
  urls = ['assets/img/dashboard/card/01.jpg','assets/img/dashboard/card/02.jpg','assets/img/dashboard/card/03.png'];
  constructor() { }

  ngOnInit() {
  }

}
