import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-example-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  option = {
    keyword  : "",
    start_date : moment().subtract(7, 'day').toDate(),
    end_date :  moment().toDate()
  }


  constructor() { }

  ngOnInit() {
  }

  disabledStartDate = (startValue) => {
    if (!startValue || !this.option.end_date) {
      return false;
    }
    return startValue.getTime() >= this.option.end_date.getTime();
  }

  disabledEndDate = (endValue) => {
    if (!endValue || !this.option.start_date) {
      return false;
    }
    return endValue.getTime() <= this.option.start_date.getTime();
  }

}
