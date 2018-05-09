import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataMapService} from "../data-map.service";
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-time',
    templateUrl: './map-time.component.html',
    styleUrls: ['./map-time.component.css']
})
export class MapTimeComponent implements OnInit, OnChanges {
    @Input() public map: any;
    project_layer: any;

    constructor(private dataMapService: DataMapService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }

    ngOnInit() {
    }

    init() {
        const me = this;
        esriLoader.loadModules(["esri/TimeExtent", "esri/layers/TimeInfo", "esri/dijit/TimeSlider", "dijit/registry", "dojo/_base/array", "dojo/dom", "esri/layers/FeatureLayer", "dojo/domReady!"])
            .then(([TimeExtent, TimeInfo, TimeSlider, registry, arrayUtils, dom, FeatureLayer]) => {
                let timeExtent = new TimeExtent();
                timeExtent.endTime = new Date("1/1/2018 UTC");
                timeExtent.startTime = new Date("1/1/2016 UTC");
                if (registry.byId('timeSlider')) {
                    registry.byId('timeSlider').destroy();
                }
                /* var tsDiv = dojo.create("div", null, dojo.byId('timeSliderDiv'));*/
                var timeSlider = new TimeSlider({
                    style: "width: 100%;",
                    id: 'timeSlider'
                }, dom.byId("timeSliderDiv"));
                timeSlider.setThumbCount(1);
                timeSlider.setThumbIndexes([12]);
                timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, TimeInfo.UNIT_MONTHS);
                timeSlider.setThumbMovingRate(2000);
                //add labels for every other time stop
                var labels = arrayUtils.map(timeSlider.timeStops, function (timeStop, i) {
                    var month = timeStop.getUTCMonth() + 1;
                    if (i % 3 === 0) {
                        if (month < 10) {
                            month = '0' + month;
                        }
                        return timeStop.getUTCFullYear() + '-' + month;
                    } else {
                        return "";
                    }
                });
                timeSlider.setLabels(labels);
                timeSlider.on("time-extent-change", function (timeExtent) {
                });
                timeSlider.startup();
                me.map.setTimeSlider(timeSlider);
                me.project_layer = me.dataMapService.getProjectLayer();
            });
    }
}
