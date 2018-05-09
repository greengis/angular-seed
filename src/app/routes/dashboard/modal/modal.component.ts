import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-example-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  record = {
    user : '张三',
    date : moment().subtract(7 , 'days').toDate(),
    desc : "执行工单",
    status : "作业前",
    address : "金地格林小镇"
  };

  constructor() { }

  ngOnInit() {
  }

}
