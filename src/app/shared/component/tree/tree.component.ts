import {
  AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ngg-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit,OnChanges {

  @Input() rawData:any = [];
  @Input() isRoot : boolean = true;
  @Input() treeData:any = [];
  @Input() collapse:boolean;
  @Output() onNodeSelect = new EventEmitter<any>();

  @ViewChildren('childTree') childTree : QueryList<TreeComponent>;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.treeData){
      if(this.isRoot){
        this.rawData = changes.treeData.currentValue;
      }
    }
  }

  ngOnInit() {
  }

  select(node){
    node.expand = !node.expand;
    this.rawData.forEach( item => {
      this.setChildrenActive(item);
    });
    node.active = true;
    this.onNodeSelect.emit(node);
  }

  setChildrenActive(node){
    node.active = false;
    if (node.children){
      node.children.forEach( item => {
        this.setChildrenActive(item);
      });
    }
  }

}
