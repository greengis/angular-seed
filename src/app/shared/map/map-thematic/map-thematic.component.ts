import {Component, Input, OnInit} from '@angular/core';
import {DataMapService} from "../data-map.service";

@Component({
  selector: 'app-map-thematic',
  templateUrl: './map-thematic.component.html',
  styleUrls: ['./map-thematic.component.css']
})
export class MapThematicComponent implements OnInit {
  @Input() public map:any;
  option :any = {
    open:false
  };
  constructor(public dataMapService:DataMapService) { }

  ngOnInit() {
  }

}
