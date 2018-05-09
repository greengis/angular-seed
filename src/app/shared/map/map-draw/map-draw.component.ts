import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GraphicService} from "../graphic.service";
import {CreateMapTextComponent} from "./create-map-text/create-map-text.component";
import * as esriLoader from 'esri-loader';

@Component({
    selector: 'app-map-draw',
    templateUrl: './map-draw.component.html',
    styleUrls: ['./map-draw.component.css']
})
export class MapDrawComponent implements OnInit,OnChanges {
    @ViewChild('createMapTextDlg') createMapTextDlg: CreateMapTextComponent;
    @Input() public map:any;
    drawToolbar:any;
    editToolbar:any;

    is_init_map: boolean = false;
    is_init_draw_toolbar: boolean = false;
    is_init_edit_toolbar: boolean = false;
    draw_graphic_layer_name: string = 'draw_graphic_layer';
    draw_label_layer_name: string = 'draw_label_layer';

    is_show_draw_layer: boolean = false;
    selected_draw_graphic : any;
    edit_menu :any;
    constructor(private graphicService: GraphicService) {
    }

    ngOnInit() {
    }

    init(draw, edit){
        this.drawToolbar = draw;
        this.editToolbar = edit;
        this.initMap();
        this.initDrawToolbar();
        this.initEditToolbar();
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
    }

    initMap(){
        esriLoader.loadModules(["esri/map", "dojo/on", "dojo/domReady!"])
            .then(([Map,on]) => {
                this.map.on("click", evt =>{
                    this.editToolbar && this.editToolbar.deactivate();
                });
                this.is_init_map = true;
            });
    }

    initDrawToolbar(){
        esriLoader.loadModules(["esri/tasks/GeometryService","esri/graphic","esri/symbols/PictureMarkerSymbol","esri/extras/DirectionalLineSymbol","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/TextSymbol", "esri/symbols/Font", "esri/Color","dojo/on", "dojo/domReady!"])
            .then(([GeometryService,Graphic,PictureMarkerSymbol,DirectionalLineSymbol,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,TextSymbol,Font, Color,on]) => {
                this.drawToolbar.on("draw-end",evt => {
                    if (this.drawToolbar.type != 'draw') return;
                    let symbol;
                    this.drawToolbar.deactivate();
                    this.map.enableMapNavigation();
                    switch (this.drawToolbar.element) {
                        case "label":
                            this.createMapTextDlg.show(evt.geometry);
                            break;
                        case "outfall":
                            symbol = new PictureMarkerSymbol('assets/img/map/toolbar/triangle-red-map.png', 20, 20);
                            break;
                        case "pump":
                            symbol = new PictureMarkerSymbol('assets/img/map/toolbar/map-pin-beng-zhan.png', 28, 28);
                            break;
                        case "waterworks":
                            symbol = new PictureMarkerSymbol('assets/img/map/toolbar/map-pin-shui-chang.png', 28, 28);
                            break;
                        case "waterpool":
                            symbol = new PictureMarkerSymbol('assets/img/map/toolbar/map-pin-tiao-xu-chi.png', 28, 28);
                            break;
                        case "pipe":
                            var advOptions = {
                                style: SimpleLineSymbol.STYLE_DASH,
                                color: new Color([23, 23, 23]),
                                width: 4.5,
                                directionSymbol: "arrow1",
                                directionPixelBuffer: 60,
                                directionColor: new Color([204, 51, 0]),
                                directionSize: 16
                            };
                            symbol = new DirectionalLineSymbol(advOptions);
                            break;
                        case "river" :
                            var  options = {
                                style: SimpleLineSymbol.STYLE_DASH,
                                color: new Color([51, 133, 255]),
                                width: 4.5
                            };
                            symbol = new SimpleLineSymbol(options);
                            break;
                        case "green":
                            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL,
                                    new Color([255,0,0]), 2),new Color([95,232,17])
                            );
                            break;
                        case "gray":
                            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL,
                                    new Color([255,0,0]), 2),new Color([168,168,168])
                            );
                            break;
                        case "blue":
                            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL,
                                    new Color([255,0,0]), 2),new Color([51,133,255])
                            );
                            break;
                    }
                    if(this.drawToolbar.element != 'label'){
                        const graphic = new Graphic(evt.geometry, symbol, {type:this.drawToolbar.element});
                        this.map.getLayer(this.draw_graphic_layer_name).add(graphic);
                    }
                });
                this.is_init_draw_toolbar = true;
            });
    }

    createMapLabel(geometry,label){
        esriLoader.loadModules(["esri/graphic","esri/symbols/TextSymbol", "esri/symbols/Font", "esri/Color","dojo/on", "dojo/domReady!"])
            .then(([Graphic,TextSymbol,Font, Color,on]) => {
                const font = new Font("12px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_NORMAL);
                font.setFamily('微软雅黑');
                const symbol = new TextSymbol(label || '标签', font, new Color([255, 0, 0]));
                symbol.setHaloColor(new Color([255, 255, 255]));
                symbol.setHaloSize(1);
                const graphic = new Graphic(geometry, symbol, {type:'label'});
                this.map.getLayer(this.draw_label_layer_name).add(graphic);
            });
    }

    initEditToolbar(){
        const me = this;
        esriLoader.loadModules(["esri/toolbars/edit","dijit/Menu", "dijit/MenuItem", "dojo/domReady!"])
            .then(([Edit, Menu, MenuItem]) => {
                this.edit_menu = new Menu({});
                this.edit_menu.addChild(new MenuItem({
                    label: "移动",
                    onClick: function() {
                        me.editToolbar.activate(Edit.MOVE, me.selected_draw_graphic);
                    }
                }));
                // ctxMenuForGraphics.addChild(new MenuSeparator());
                this.edit_menu.addChild(new MenuItem({
                    label: "删除",
                    onClick: function() {
                        const draw_layer = me.map.getLayer(me.draw_graphic_layer_name);
                        if (draw_layer) {
                            draw_layer.remove(me.selected_draw_graphic);
                        }
                        const label_layer = me.map.getLayer(me.draw_label_layer_name);
                        if (label_layer) {
                            label_layer.remove(me.selected_draw_graphic);
                        }
                    }
                }));
                this.edit_menu.startup();
                this.is_init_edit_toolbar = true;
            });
    }

    clearDrawLayer() {
        if (this.map.getLayer(this.draw_graphic_layer_name)) {
            this.map.getLayer(this.draw_graphic_layer_name).clear();
        }
        if (this.map.getLayer(this.draw_label_layer_name)) {
            this.map.getLayer(this.draw_label_layer_name).clear();
        }
    }

    activateDrawTool(tool,element){
        this.map.disableMapNavigation();
        this.drawToolbar.activate(tool);
        this.drawToolbar.type = "draw";
        this.drawToolbar.element = element;
    }

    saveGeo() {
        const draw_layer = this.map.getLayer(this.draw_graphic_layer_name);
        const label_layer = this.map.getLayer(this.draw_label_layer_name);
        if (draw_layer) {
            const graphics = [];
            draw_layer.graphics.forEach(function (g, index) {
                if (g.attributes && g.attributes.isDirectionalGraphic) {
                    //箭头不保存
                } else {
                    graphics.push(g.toJson());
                }
            });
            label_layer.graphics.forEach(function (g, index) {
                graphics.push(g.toJson());
            });

            this.graphicService.saveByUser(JSON.stringify(graphics))
                .subscribe(res => {
                    console.log('success');
                });
        }
    }

    loadGeo() {
        esriLoader.loadModules(["esri/map", "esri/layers/GraphicsLayer", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/extras/DirectionalLineSymbol", "esri/symbols/Font", "esri/Color", "dojo/on", "dojo/domReady!"])
            .then(([Map, GraphicsLayer, Graphic, SimpleLineSymbol, DirectionalLineSymbol, Font, Color, on]) => {
                //this.is_show_draw_layer = !this.is_show_draw_layer;
                let draw_layer = this.map.getLayer(this.draw_graphic_layer_name);
                let label_layer = this.map.getLayer(this.draw_label_layer_name);
                if (!draw_layer) {
                    draw_layer = new GraphicsLayer({opacity: 0.65});
                    draw_layer.id = this.draw_graphic_layer_name;
                    label_layer = new GraphicsLayer({minScale: 40110});
                    label_layer.id = this.draw_label_layer_name;
                    this.map.addLayer(draw_layer);
                    this.map.addLayer(label_layer);
                    draw_layer.on("mouse-over", evt => {
                        // We'll use this "selected" graphic to enable editing tools
                        // on this graphic when the user click on one of the tools
                        // listed in the menu.
                        this.selected_draw_graphic = evt.graphic;

                        // Let's bind to the graphic underneath the mouse cursor
                        this.edit_menu.bindDomNode(evt.graphic.getDojoShape().getNode());
                    });
                    draw_layer.on("mouse-out", evt =>{
                        this.edit_menu.unBindDomNode(evt.graphic.getDojoShape().getNode());
                    });
                    label_layer.on("mouse-over", evt => {
                        // We'll use this "selected" graphic to enable editing tools
                        // on this graphic when the user click on one of the tools
                        // listed in the menu.
                        this.selected_draw_graphic = evt.graphic;

                        // Let's bind to the graphic underneath the mouse cursor
                        this.edit_menu.bindDomNode(evt.graphic.getDojoShape().getNode());
                    });
                    label_layer.on("mouse-out", evt =>{
                        this.edit_menu.unBindDomNode(evt.graphic.getDojoShape().getNode());
                    });
                    this.graphicService.loadByUser()
                        .subscribe(res => {
                            if(!res) return;
                            const graphics = JSON.parse(res.geo);
                            const points = [], polylines = [], polygons = [];
                            if (graphics) {
                                graphics.forEach(function (gg) {
                                    const graphic = new Graphic(gg);
                                    if (gg.symbol && gg.symbol.type == "esriTS") {
                                        label_layer.add(graphic);
                                    } else if (gg.symbol && gg.symbol.type == "esriSLS") {
                                        if (gg.attributes && gg.attributes.type && gg.attributes.type == 'pipe') {
                                            const advOptions = {
                                                style: SimpleLineSymbol.STYLE_DASH,
                                                color: new Color([23, 23, 23]),
                                                width: 4,
                                                directionSymbol: "arrow1",
                                                directionPixelBuffer: 60,
                                                directionColor: new Color([204, 51, 0]),
                                                directionSize: 16
                                            };
                                            var symbol = new DirectionalLineSymbol(advOptions);
                                            polylines.push(new Graphic(graphic.geometry, symbol, {type: 'pipe'}))
                                        } else {
                                            polylines.push(graphic);
                                        }
                                    } else if (gg.symbol && gg.symbol.type == "esriSFS") {
                                        polygons.push(graphic);
                                    } else {
                                        points.push(graphic);
                                    }
                                });
                                polygons.forEach(function (g) {
                                    draw_layer.add(g);
                                });
                                polylines.forEach(function (g) {
                                    draw_layer.add(g);
                                });
                                points.forEach(function (g) {
                                    draw_layer.add(g);
                                });
                            }
                        });
                }
                draw_layer.setVisibility(this.is_show_draw_layer);
                label_layer.setVisibility(this.is_show_draw_layer);
            });

    };


}
