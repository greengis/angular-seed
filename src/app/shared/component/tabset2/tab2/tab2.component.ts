import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngg-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {

  @Input() heading : string = "tab";
  @Input() active : boolean;

  constructor() { }

  ngOnInit() {
  }

}
