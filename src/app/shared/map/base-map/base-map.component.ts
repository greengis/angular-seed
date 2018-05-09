import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfigService} from "../../../core/config/config.service";
import * as esriLoader from 'esri-loader';
import {CoreMapService} from "../core-map.service";
declare var AMap: any;

@Component({
    selector: 'app-base-map',
    templateUrl: './base-map.component.html',
    styleUrls: ['./base-map.component.css'],
    providers: [CoreMapService]
})
export class BaseMapComponent implements OnInit {
    @ViewChild('aMapDiv') aMapDiv: ElementRef;
    @ViewChild('esriMapDiv') esriMapDiv: ElementRef;
    @Input() wrapper;
    @Output() mapInit = new EventEmitter<any>();

    constructor(private elRef: ElementRef, private coreMapService: CoreMapService, private configService: ConfigService) {

    }

    ngOnInit() {
        const me = this;
        const options = {
            url: 'assets/js/map/init.js'
        };
        esriLoader.loadModules(["esri/map", "esri/SpatialReference", "esri/domUtils", "esri/geometry/webMercatorUtils",
            "esri/geometry/Point", "esri/extras/EmptyTileLayer", "dojo/dom", "dojo/on", "dojo/domReady!"], options).then(([Map, SpatialReference, domUtils, webMercatorUtils, Point, EmptyTileLayer, dom, on]) => {

            this.wrapper.option = this.wrapper.option || {};
            this.wrapper.option.logo = this.wrapper.option.hasOwnProperty('logo') ? this.wrapper.option.logo : false;
            this.wrapper.option.slider = this.wrapper.option.hasOwnProperty('slider') ? this.wrapper.option.slider : true;
            this.wrapper.option.showLabels =  this.wrapper.option.hasOwnProperty('showLabels')? this.wrapper.option.showLabels : true;
            this.wrapper.option.isScrollWheelZoom = this.wrapper.option.hasOwnProperty('isScrollWheelZoom') ? this.wrapper.option.isScrollWheelZoom : true;
            this.wrapper.option.showLoading = this.wrapper.option.hasOwnProperty('showLoading') ? this.wrapper.option.showLoading : true;
            this.wrapper.option.showImageMap = this.wrapper.option.hasOwnProperty('showImageMap') ? this.wrapper.option.showImageMap : false;
            this.wrapper.option.showSatellite = this.wrapper.option.hasOwnProperty('showSatellite') ? this.wrapper.option.showSatellite : false;
            this.wrapper.option.maxZoom = 18;
            this.wrapper.amap = new AMap.Map(this.aMapDiv.nativeElement, {
                zoom: me.configService.main_map_center.zoom,
                center: [me.configService.main_map_center.x, me.configService.main_map_center.y],
                animateEnable: this.wrapper.option.hasOwnProperty('animateEnable') ? this.wrapper.option.animateEnable : true,
                dragEnable: false,
                zoomEnable: false,
                doubleClickZoom: false,
                keyboardEnable: false,
                scrollWheel: false,
                mapStyle: this.wrapper.option.mapStyle || 'normal',
                features: this.wrapper.option.features || ['bg'],
                viewMode: this.wrapper.option.viewMode || '2D'
            });

            const satellite = new AMap.TileLayer.Satellite();
            satellite.setMap(this.wrapper.amap);

            if (!this.wrapper.option.showSatellite) {
                satellite.hide();
                this.wrapper.amap.setFeatures(this.wrapper.option.features || ['bg']);
            }

            this.wrapper.map = new Map(this.esriMapDiv.nativeElement, this.wrapper.option);
            this.wrapper.map.spatialReference = new SpatialReference({
                wkid: 102113
            });

            on(this.wrapper.map, "zoom", function (evt) {
                var point = evt.extent.getCenter();
                var newPoint = webMercatorUtils.webMercatorToGeographic(point);
                me.wrapper.amap.setZoom(me.wrapper.map.getLevel() + Math.log2(evt.zoomFactor));
            });

            on(this.wrapper.map, 'extent-change', function (evt) {
                var point = me.wrapper.map.extent.getCenter();
                var newPoint = webMercatorUtils.webMercatorToGeographic(point);
                me.wrapper.amap.setZoomAndCenter(me.wrapper.map.getLevel(), [newPoint.x, newPoint.y]);
            });

            this.coreMapService.init(this.wrapper.map);
            if (this.wrapper.option.showImageMap && this.configService.image_map_server) {
                this.coreMapService.addImageLayer();
            } else {
                this.coreMapService.addEmptyTileLayer();
            }
            this.wrapper.option.isScrollWheelZoom || this.wrapper.map.disableScrollWheelZoom();
            var p = new Point(this.configService.main_map_center.x, this.configService.main_map_center.y);
            this.wrapper.map.centerAndZoom(p, this.configService.main_map_center.zoom);
            this.mapInit.emit();
        });
    }

}
