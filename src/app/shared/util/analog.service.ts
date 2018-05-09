import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/take";

@Injectable()
export class AnalogService {

  constructor() { }

  //interval : min
  //base : 基数
  //range : 变化范围
  //length : 数量
  randomTimeSeries(interval, base, range, length, min?, max?, start?) {
    min = min || Number.MIN_VALUE;
    max = max || Number.MAX_VALUE;
    const data = [];
    interval = interval * 60 * 1000 || 5 * 60 * 1000;
    let date = start || new Date(1997, 9, 3);
    date = new Date((+date) - interval);
    let value = base;
    for (let i = 0; i < length; i++) {
      date = new Date((+date) + interval);
      value = value + Math.random() * (range * 2) - range;
      value = value > max ? max : value;
      value = value < min ? min : value;
      data.push({
        date: date,
        value: value.toFixed(3)
      });
    }
    return data;
  }

  //interval : min
  //base : 基数
  //range : 变化范围
  //length : 数量
  randomTimeSeriesAsync(interval, base, range, length, min?, max?, start?) : Observable<any> {
    min = min || Number.MIN_VALUE;
    max = max || Number.MAX_VALUE;
    const data = [];
    interval = interval * 60 * 1000 || 5 * 60 * 1000;
    let date = start || new Date(1997, 9, 3);
    date = new Date((+date) - interval);
    let value = base;
    return Observable.interval(3000).take(length).map( item => {
      date = new Date((+date) + interval);
      value = value + Math.random() * (range * 2) - range;
      value = value > max ? max : value;
      value = value < min ? min : value;
      return {
        date: date,
        value: value.toFixed(3)
      }
    });
  }

}
