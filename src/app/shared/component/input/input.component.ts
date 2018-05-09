import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'ngg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  //_property : any;
  @Input() required : boolean;
  @Input() readonly : boolean;
  @Input() icon : string;
  @Input() width : string = '120px';
  @Input() type : string = "text";
  @Input() title : any = "";
  //@Input() property: any;
  @Output() propertyChange = new EventEmitter();
  _property: any;

  constructor() { }


  @Input()
  get property() {
    return this._property;
  }
  set property(val) {
    if (this.type === 'date'){
      this._property = moment(val).format("YYYY-MM-DD");
    }
    else if (this.type === 'time') {
      this._property = moment(val).format("HH:mm");
    }
    else if (this.type === 'datetime') {
      this._property = moment(val).format("YYYY-MM-DD HH:mm");
    }
    else{
      this._property = val;
    }
  }

  change(val){
    this._property = val;
    if (this.type === 'date'){
      this.propertyChange.emit(moment(this._property,["YYYY-MM-DD"]).toDate());
    }
    else if (this.type === 'time') {
      this.propertyChange.emit(moment(this._property,["HH:mm"]).toDate());
    }
    else if (this.type === 'datetime') {
      this.propertyChange.emit(moment(this._property,["YYYY-MM-DD HH:mm"]).toDate());
    }
    else{
      this.propertyChange.emit(this._property);
    }
  }

  ngOnInit() {
  }

}
