import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {TabDirective} from "./tab.directive";

@Component({
  selector: 'ngg-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements OnInit {

  tabs = [];

  constructor() { }

  ngOnInit() {
  }

  active(tab){
    this.tabs.forEach( item => {
      if (tab !== item) {
        item.active = false;
      }
    });
    tab.active = true;
  }

  add(tab){
    this.tabs.push(tab);
  }
}
