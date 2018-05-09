import {Injectable} from '@angular/core';
import {ConfigService} from "../../core/config/config.service";
import * as esriLoader from 'esri-loader';

@Injectable()
export class CoreMapService {
    map: any;
    selection_layer_id: string = "select_graphic";
    highlight_layer_id: string = "highlight_graphic";

    constructor(private configService: ConfigService) {
    }

    init(map) {
        this.map = map;
    }

    addEmptyTileLayer(onLoaded?) {
        esriLoader.loadModules(["esri/extras/EmptyTileLayer", "dojo/domReady!"])
            .then(([EmptyTileLayer]) => {
                const layer = new EmptyTileLayer();
                this.map.addLayer(layer);
                onLoaded && onLoaded(layer);
            });
    }

    addImageLayer(onLoaded?) {
        esriLoader.loadModules(["esri/layers/ArcGISTiledMapServiceLayer", "esri/SpatialReference", "dojo/domReady!"])
            .then(([ArcGISTiledMapServiceLayer,SpatialReference]) => {
                const layer = new ArcGISTiledMapServiceLayer(this.configService.image_map_server);
                this.map.addLayer(layer);
                layer.on('load',()=>{
                    this.map.spatialReference = new SpatialReference({
                        wkid: 102113
                    });
                });
                onLoaded && onLoaded(layer);
            });
    }

    addGraphicLayer(onLoaded?) {
        esriLoader.loadModules(["esri/layers/GraphicsLayer", "dojo/domReady!"])
            .then(([GraphicsLayer]) => {
                const layer = new GraphicsLayer();
                this.map.addLayer(layer);
                onLoaded && onLoaded(layer);
            });
    }

    addSelectionLayer(onLoaded?) {
        esriLoader.loadModules(["esri/layers/GraphicsLayer", "dojo/domReady!"])
            .then(([GraphicsLayer]) => {
                const select_graphic_layer = new GraphicsLayer();
                select_graphic_layer.id = this.selection_layer_id;
                this.map.addLayer(select_graphic_layer);
                if (onLoaded) {
                    onLoaded(select_graphic_layer);
                }
            });
    }

    clearSelectionLayer() {
        this.map.getLayer(this.selection_layer_id) && this.map.getLayer(this.selection_layer_id).clear();
    }

    selectGraphic(graphic, append?) {
        esriLoader.loadModules(["esri/graphic", "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color"])
            .then(([Graphic, PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color]) => {
                if (this.map.getLayer(this.selection_layer_id)) {
                    if (!append) this.map.getLayer(this.selection_layer_id).clear();
                    if (graphic.geometry.type == 'point') {
                        const point_symbol = new PictureMarkerSymbol("assets/img/map/map-select-flashing.gif", 30, 30);
                        const select_graphic = new Graphic(graphic.geometry, point_symbol);
                        this.map.getLayer(this.selection_layer_id).add(select_graphic);
                    } else if (graphic.geometry.type == 'polyline') {
                        const polyline_symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 1);
                        polyline_symbol.width = 5;
                        const select_polyline = new Graphic(graphic.geometry, polyline_symbol);
                        this.map.getLayer(this.selection_layer_id).add(select_polyline);
                    } else if (graphic.geometry.type == 'polygon') {
                        const select_polygon = new Graphic(graphic.geometry, new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL).setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5)));
                        this.map.getLayer(this.selection_layer_id).add(select_polygon);
                    }
                }
            })
    }

    addHighlightLayer(onLoaded?) {
        esriLoader.loadModules(["esri/layers/GraphicsLayer", "dojo/domReady!"])
            .then(([GraphicsLayer]) => {
                const highlight_graphic_layer = new GraphicsLayer();
                highlight_graphic_layer.id = this.highlight_layer_id;
                this.map.addLayer(highlight_graphic_layer);
                if (onLoaded) {
                    onLoaded(highlight_graphic_layer);
                }
            });
    }

    clearHighlightLayer() {
        this.map.getLayer(this.highlight_layer_id) && this.map.getLayer(this.highlight_layer_id).clear();
    }

    highlightGraphic(graphic, append?) {
        esriLoader.loadModules(["esri/graphic", "esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color"])
            .then(([Graphic, PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color]) => {
                if (this.map.getLayer(this.highlight_layer_id)) {
                    if (!append) this.map.getLayer(this.highlight_layer_id).clear();
                    if (graphic.geometry.type == 'point') {
                        const point_symbol = new PictureMarkerSymbol("assets/img/map/map-highlight-flashing.gif", 30, 30);
                        const select_graphic = new Graphic(graphic.geometry, point_symbol);
                        this.map.getLayer(this.highlight_layer_id).add(select_graphic);
                    } else if (graphic.geometry.type == 'polyline') {
                        const polyline_symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 1);
                        polyline_symbol.width = 5;
                        const select_polyline = new Graphic(graphic.geometry, polyline_symbol);
                        this.map.getLayer(this.highlight_layer_id).add(select_polyline);
                    } else if (graphic.geometry.type == 'polygon') {
                        const select_polygon = new Graphic(graphic.geometry, new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL).setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0]), 5)));
                        this.map.getLayer(this.highlight_layer_id).add(select_polygon);
                    }
                }
            })
    }

    zoomToGraphic(graphic, level?) {
        esriLoader.loadModules(["esri/geometry/Point"])
            .then(([Point]) => {
                if (graphic.geometry.type == 'point') {
                    if (level) {
                        this.map.centerAndZoom(graphic.geometry, level);
                    } else {
                        this.map.centerAt(graphic.geometry);
                    }
                } else if (graphic.geometry.type == 'polyline') {
                    const point = new Point();
                    point.setLatitude((graphic.geometry._extent.ymax + graphic.geometry._extent.ymin) / 2);
                    point.setLongitude((graphic.geometry._extent.xmax + graphic.geometry._extent.xmin) / 2);
                    point.setSpatialReference(graphic.geometry.spatialReference)
                    if (level) {
                        this.map.centerAndZoom(point, level);
                    } else {
                        this.map.centerAt(point);
                    }
                } else if (graphic.geometry.type == 'polygon') {
                    if (level) {
                        this.map.centerAndZoom(graphic.geometry.getCentroid(), level);
                    } else {
                        this.map.centerAt(graphic.geometry.getCentroid());
                    }
                }
            });
    }

}
