import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  check1 : boolean = false;
  check2 : boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
