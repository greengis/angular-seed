import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  checkedValue = true;

  @Output() checkedChange = new EventEmitter();

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

}
