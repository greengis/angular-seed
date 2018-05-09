import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-slider',
    templateUrl: './map-slider.component.html',
    styleUrls: ['./map-slider.component.css']
})
export class MapSliderComponent implements OnInit, OnChanges {


    @Output() onSliderChange = new EventEmitter<any>();
    @Output() onSliderInit = new EventEmitter<any>();
    @Input() public config: any;
    time_slider: any;

    constructor() {

    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    getCurrentTimeExtent() {
        if (this.time_slider) {
            return this.time_slider.getCurrentTimeExtent();
        }
        else {
            return null
        }
    }

    setLabels(labels) {
        if (this.time_slider && labels) {
            this.time_slider.setLabels(labels);
        }
    }

    getLabels() {
        if (this.time_slider) {
            return this.time_slider.labels;
        }
        else {
            return [];
        }
    }

    reset() {
        if (this.time_slider) {
            this.time_slider.pause();
            this.time_slider.setThumbIndexes([0]);
        }
    }

    init() {
        const me = this;
        esriLoader.loadModules(["esri/TimeExtent", "esri/layers/TimeInfo", "esri/dijit/TimeSlider", "dijit/registry", "dojo/_base/array", "dojo/dom", "dojo/dom-construct", "esri/layers/FeatureLayer", "dojo/domReady!"])
            .then(([TimeExtent, TimeInfo, TimeSlider, registry, arrayUtils, dom, domConstruct, FeatureLayer]) => {
                let timeExtent = new TimeExtent();
                timeExtent.endTime = new Date(this.config.endTime);
                timeExtent.startTime = new Date(this.config.startTime);

                if (registry.byId('modelTimeSlider')) {
                    registry.byId('modelTimeSlider').destroy();
                }

                this.time_slider = new TimeSlider({
                    style: "width: 100%;",
                    id: 'modelTimeSlider'
                }, domConstruct.create("div", null, dom.byId("modelTimeSliderDiv")));

                this.time_slider.setThumbCount(1);
                this.time_slider.createTimeStopsByTimeInterval(timeExtent, this.config.step || 20, TimeInfo.UNIT_MINUTES);
                this.time_slider.setThumbIndexes([0]);
                this.time_slider.setThumbMovingRate(2000);
                this.time_slider.setLabels(this.config.labels);

                this.time_slider.on("time-extent-change", function (timeExtent) {
                    me.onSliderChange.emit();
                });
                this.time_slider.startup();
                this.onSliderInit.emit();
            });
    };

}
