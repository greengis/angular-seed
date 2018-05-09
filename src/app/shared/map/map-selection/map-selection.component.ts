import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigService} from "../../../core/config/config.service";
import {CoreMapService} from "../core-map.service";
import {DataMapService} from "../data-map.service";
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-selection',
    templateUrl: './map-selection.component.html',
    styleUrls: ['./map-selection.component.css']
})
export class MapSelectionComponent implements OnInit, OnChanges {
    @Input() public map:any;
    @Output() mapSelected = new EventEmitter<any>();

    is_init_map: boolean = false;
    select_features: any = [];
    cur_select_feature: any;
    paging: any = {
        total_items: 0,
        page_size: 1,
        display_pages: 3,
        num_pages: 0,
        current_page: 1,
        keyword: ''
    };

    constructor(private coreMapService: CoreMapService, private configService: ConfigService, private dataMapService: DataMapService) {
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
                const identifyTask = new IdentifyTask(this.configService.data_map_server);
                const identifyParams = new IdentifyParameters();
                identifyParams.tolerance = 3;
                identifyParams.returnGeometry = true;

                const executeIdentifyTask = function (event) {
                    const layerIds = [];
                    const project_layer = me.dataMapService.getProjectLayer();
                    project_layer.is_check && layerIds.push(project_layer.layer_index);
                    if (layerIds.length == 0) return;
                    identifyParams.layerIds = layerIds;
                    identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
                    identifyParams.geometry = event.mapPoint;
                    //identifyParams.layerDefinitions = me.dataMapService.getLayerDefinitions(scope.map);
                    identifyParams.mapExtent = me.map.extent;
                    identifyTask.execute(identifyParams)
                        .addCallback(function (response) {
                            if (response && Array.isArray(response)) {
                                for (let i = 0; i < response.length; i++) {
                                    const item: any = response[i];
                                    me.coreMapService.selectGraphic(item.feature, false);
                                    me.mapSelected.emit(item.feature.attributes[project_layer.identify.field]);
                                    break;
                                }
                            }

                        });
                };
                me.map.on("click", evt => {
                    me.coreMapService.clearSelectionLayer();
                    me.select_features = [];
                    executeIdentifyTask(evt);
                });
                me.is_init_map = true;
            });
    }

    pageChanged(item) {
        this.cur_select_feature = this.select_features[item.page - 1];
        this.coreMapService.zoomToGraphic(this.cur_select_feature.feature);
        this.coreMapService.selectGraphic(this.cur_select_feature.feature);
    }
}
