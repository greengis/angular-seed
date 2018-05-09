import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-example-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  username : string;
  password : string;
  age : number;
  email : string;
  //date : Date = moment("2018-01-03").toDate();
  date_1 : string = "2018-01-03";
  date_2 : Date = moment("2018-01-03").toDate();
  time_2 : Date = moment("2018-01-03 01:00:05").toDate();
  datetime_2 : Date = moment("2018-01-03 01:00:05").toDate();

  constructor() { }

  ngOnInit() {
  }

  change(date){
    console.log(date);
  }
}
