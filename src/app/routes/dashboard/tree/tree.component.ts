import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  tree = [{
    name : 'root',
    children : [{
      name : 'node1'
    },{
      name : 'node2',
      children : [{
        name : 'node21'
      }]
    },{
      name : 'node3',
      children : [{
        name : 'node31'
      }]
    }]
  }];

  constructor() { }

  ngOnInit() {
  }

}
