import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfigService} from "../../../core/config/config.service";
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-measure',
    templateUrl: './map-measure.component.html',
    styleUrls: ['./map-measure.component.css']
})
export class MapMeasureComponent implements OnInit,OnChanges {
    /*@Input() public wrapper: any;*/
    @Input() public map:any;
    toolbar:any;

    is_init_map : boolean = false;
    is_init_toolbar : boolean = false;
    measure_layer_name: string = 'measure_layer';
    measure_polygon: any;
    measure_polyline: any;
    measure_font: any;
    geometry_service:any;
    constructor(private configService: ConfigService) {
    }
    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }
    ngOnInit() {

    }

    init(draw){
        this.toolbar = draw;
        this.initMap();
        this.initToolbar();
    }

    initMap(){
        esriLoader.loadModules(["esri/map", "esri/tasks/GeometryService","esri/graphic","esri/symbols/TextSymbol","esri/toolbars/draw", "esri/symbols/Font", "esri/Color","dojo/on", "dojo/domReady!"])
            .then(([Map, GeometryService,Graphic,TextSymbol,Draw, Font, Color,on]) => {
                this.measure_font = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_NORMAL);
                this.measure_font.setFamily('微软雅黑');
                this.geometry_service = new GeometryService(this.configService.geometry_server);
                this.geometry_service.on("areas-and-lengths-complete", evtObj => {
                    const result = evtObj.result;
                    const label_location = this.measure_polygon.getCentroid();
                    const text_symbol = new TextSymbol('面积:' + result.areas[0].toFixed(4) * 100 + " 公顷", this.measure_font, new Color([255, 0, 0]));
                    text_symbol.setHaloColor(new Color([255, 255, 255]));
                    text_symbol.setHaloSize(1);
                    const label_graphic = new Graphic(label_location, text_symbol);
                    this.addMeasureGraphic(label_graphic);
                });
                this.geometry_service.on("lengths-complete", evtObj => {
                    const result = evtObj.result;
                    const measure_polyline_length = this.measure_polyline.paths[0].length;
                    const label_location = this.measure_polyline.getPoint(0, measure_polyline_length - 1);
                    const text_symbol = new TextSymbol('长度:' + result.lengths[0].toFixed(2) + " 米", this.measure_font, new Color([255, 0, 0]));
                    text_symbol.setHaloColor(new Color([255, 255, 255]));
                    text_symbol.setHaloSize(1);
                    const label_graphic = new Graphic(label_location, text_symbol);
                    this.addMeasureGraphic(label_graphic);
                });
                this.is_init_map = true;
            });
    }

    initToolbar(){
        esriLoader.loadModules(["esri/tasks/GeometryService","esri/graphic","esri/tasks/LengthsParameters","esri/tasks/AreasAndLengthsParameters","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","dojo/on", "dojo/domReady!"])
            .then(([GeometryService,Graphic,LengthsParameters,AreasAndLengthsParameters,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,on]) => {
                this.toolbar.on("draw-end",evt => {
                    if (this.toolbar.type != 'measure') return;
                    let symbol;
                    this.toolbar.deactivate();
                    this.map.enableMapNavigation();
                    switch (evt.geometry.type) {
                        case "point":
                        case "multipoint":
                            symbol = new SimpleMarkerSymbol();
                            break;
                        case "polyline":
                            symbol = new SimpleLineSymbol();
                            this.measure_polyline = evt.geometry;
                            break;
                        default:
                            symbol = new SimpleFillSymbol();
                            this.measure_polygon = evt.geometry;
                            break;
                    }
                    const graphic = new Graphic(evt.geometry, symbol);
                    this.addMeasureGraphic(graphic);
                    if (evt.geometry.type == "polyline") {
                        const lengthParams = new LengthsParameters();
                        lengthParams.polylines = [evt.geometry];
                        lengthParams.lengthUnit = GeometryService.UNIT_METER;
                        lengthParams.geodesic = true;
                        this.geometry_service.lengths(lengthParams);
                    }else if (evt.geometry.type == "polygon"){
                        const areasAndLengthParams = new AreasAndLengthsParameters();
                        areasAndLengthParams.lengthUnit = GeometryService.UNIT_METER;
                        areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;
                        areasAndLengthParams.calculationType = "geodesic";
                        this.geometry_service.simplify([evt.geometry], simplifiedGeometries =>{
                            areasAndLengthParams.polygons = simplifiedGeometries;
                            this.geometry_service.areasAndLengths(areasAndLengthParams);
                        });
                    }
                });
                this.is_init_toolbar = true;
            });
    }

    addMeasureGraphic(graphic) {
        esriLoader.loadModules(["esri/layers/GraphicsLayer", "dojo/domReady!"]).then(([GraphicsLayer]) => {
            if (!this.map.getLayer('measure_layer')) {
                var measure_layer = new GraphicsLayer();
                measure_layer.id = this.measure_layer_name;
                this.map.addLayer(measure_layer);
            }
            this.map.getLayer(this.measure_layer_name).add(graphic);
        });
    }

    clearMeasureLayer() {
        if (this.map.getLayer(this.measure_layer_name)) {
            this.map.getLayer(this.measure_layer_name).clear();
        }
    }

    activateDrawTool(tool){
        this.map.disableMapNavigation();
        this.toolbar.activate(tool);
        this.toolbar.type = "measure";
    }
}
