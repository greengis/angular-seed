import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as esriLoader from 'esri-loader';
import {CoreMapService} from "../core-map.service";

@Component({
    selector: 'app-empty-map',
    templateUrl: './empty-map.component.html',
    styleUrls: ['./empty-map.component.scss'],
    providers: [CoreMapService]
})
export class EmptyMapComponent implements OnInit {

    @ViewChild('esriMapDiv') esriMapDiv: ElementRef;
    @Input() wrapper;
    @Output() mapInit = new EventEmitter<any>();

    constructor(private coreMapService: CoreMapService) {

    }

    ngOnInit() {
        const me = this;
        esriLoader.loadModules(["esri/map", "esri/SpatialReference", "esri/domUtils", "esri/geometry/webMercatorUtils",
            "esri/geometry/Point", "esri/extras/EmptyTileLayer", "dojo/dom", "dojo/on", "dojo/domReady!"]).then(([Map, SpatialReference, domUtils, webMercatorUtils, Point, EmptyTileLayer, dom, on]) => {

            this.wrapper.option = this.wrapper.option || {};

            this.wrapper.map = new Map(this.esriMapDiv.nativeElement, this.wrapper.option);
            this.wrapper.map.spatialReference = new SpatialReference({
                wkid: 102113
            });
            this.coreMapService.init(this.wrapper.map);
            this.mapInit.emit();
        });
    }

}
