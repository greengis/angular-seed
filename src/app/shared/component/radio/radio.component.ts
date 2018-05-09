import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngg-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  checkedValue:String;
  @Output() checkedChange = new EventEmitter();

  @Input() public value: String;
  @Input()
  get checked() {
    return this.checkedValue;
  }

  set checked(val) {
    this.checkedValue = val;
    this.checkedChange.emit(this.checkedValue);
  }
  constructor() { }

  ngOnInit() {
  }

  change(){
    this.checkedValue = this.value;
    this.checkedChange.emit(this.checkedValue);
  }
}
