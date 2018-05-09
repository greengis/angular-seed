import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  check1 : string = 'value1';
  check2 : string = 'cap';

  constructor() { }

  ngOnInit() {
  }

}
