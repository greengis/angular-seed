import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-example-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  login_logs = [
    {
      ip : "127.0.0.1",
      date : moment("2018-01-01 00:00:00"),
      country : "北京市海淀市",
      area : "",
      action : "登入",
    },
    {
      ip : "127.0.0.1",
      date : moment("2018-01-02 00:00:00"),
      country : "北京市海淀市",
      area : "",
      action : "登出",
    },
    {
      ip : "127.0.0.1",
      date : moment("2018-01-04 00:00:00"),
      country : "北京市海淀市",
      area : "",
      action : "登入",
    },
    {
      ip : "127.0.0.1",
      date : moment("2018-01-05 00:00:00"),
      country : "北京市海淀市",
      area : "",
      action : "登出",
    }
  ];
  messages = [
    {
      source: "城防指",
      name : "蓝色预警",
      description: "雨量计实测小时降雨量达到[30mm]以上，[50mm]以下",
      date: moment(),
      dealt : 0
    },
    {
      source: "城防指",
      name : "黄色预警",
      description: "雨量计实测小时降雨量达到[50mm]以上，[80mm]以下",
      date: moment(),
      dealt : 0
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
