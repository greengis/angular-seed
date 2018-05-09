import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataMapService} from "../data-map.service";

@Component({
  selector: 'app-map-layer',
  templateUrl: './map-layer.component.html',
  styleUrls: ['./map-layer.component.css']
})
export class MapLayerComponent implements OnInit {
  @Input() public map: any;
  @Input() public amap: any;
  @Input() public satellite: boolean;
  @Output() layerChecked = new EventEmitter<any>();
  option :any = {
    open:false,
    map_type : this.satellite?"amap_image":"amap_base",
    base_layers : [{
      name: '道路',
      is_check : true,
      layer_type: 'road'
    },{
      name: '建筑物',
      is_check : false,
      layer_type: 'building'
    },{
      name: '标注',
      is_check : false,
      layer_type : 'point'
    },{
      name: '绿地水系',
      is_check : true,
      layer_type : 'bg'
    }]
  };
  constructor(public dataMapService: DataMapService) {

  }

  ngOnInit() {
  }

  showMapLayer = function (layer) {
    this.dataMapService.refresh();
    this.layerChecked.emit(layer);
  }

  changeBaseMap = function(){
    if(this.option.map_type === 'amap_image'){
      const amap_layer = this.amap.getLayers();
      if(amap_layer && amap_layer.length>0){
        amap_layer[amap_layer.length-1].show();
      }
    }else{
      const amap_layer = this.amap.getLayers();
      if(amap_layer && amap_layer.length>0){
        amap_layer[amap_layer.length-1].hide();
      }
      const v_layers = [];
      this.option.base_layers.forEach( item =>{
        if(item.is_check){
          v_layers.push(item.layer_type);
        }
      });
      this.amap.setFeatures(v_layers);
    }
  }
}
