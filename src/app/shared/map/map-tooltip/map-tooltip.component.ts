import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfigService} from "../../../core/config/config.service";
import {DataMapService} from "../data-map.service";
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-tooltip',
    templateUrl: './map-tooltip.component.html',
    styleUrls: ['./map-tooltip.component.css']
})
export class MapTooltipComponent implements OnInit, OnChanges {
    @Input() public map:any;
    @Input() public offsetLeft: number = 0;
    @Input() public offsetTop: number = -30;
    is_init_map: boolean = false;
    left: string = '0px';
    top: string = '0px';
    show: boolean = false;
    title: string = '';
    tooltip: any = {};

    constructor(private configService: ConfigService, private dataMapService: DataMapService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }

    ngOnInit() {
    }

    init() {
        const me = this;
        esriLoader.loadModules(["esri/layers/FeatureLayer", "esri/geometry/Extent", "esri/tasks/query",
            "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters",
            "dojo/domReady!"])
            .then(([FeatureLayer, Extent, Query, IdentifyTask, IdentifyParameters]) => {
                const layerinfos = this.dataMapService.getAllLayers();
                layerinfos.forEach(function (layerinfo) {
                    if (layerinfo.tooltip && layerinfo.tooltip.title_field) {
                        const layer = new FeatureLayer(me.configService.data_map_server + "/" + layerinfo.layer_index, {
                            mode: FeatureLayer.MODE_SNAPSHOT,
                            outFields: [layerinfo.tooltip.title_field]
                        });
                        layer.on('mouse-over', function (evt) {
                            me.title = evt.graphic.attributes[layerinfo.tooltip.title_field];
                            me.left = (evt.clientX + me.offsetLeft) + 'px';
                            me.top = (evt.clientY + me.offsetTop) + 'px';
                            me.show = true;
                        });
                        layer.on('mouse-out', function (evt) {
                            me.show = false;
                        });
                        me.tooltip[layerinfo.layer_index] = layer;
                        me.map.addLayer(layer);
                        layer.setVisibility(false);
                    }
                });
                me.is_init_map = true;
            });
    }

    refresh(layerinfo) {
        const index = layerinfo.layer_index;
        if (this.tooltip[index]) {
            this.tooltip[index].setVisibility(layerinfo.is_check);
        }
    }
}
