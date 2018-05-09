import {Injectable} from '@angular/core';
import {ConfigService} from "../../core/config/config.service";
import {JsonService} from "../util/json.service";
import * as esriLoader from 'esri-loader';

@Injectable()
export class BaseMapService {
    id:string = "";
    url:string = "";
    json:string = "";
    map : any;
    config :any;
    constructor(protected configService: ConfigService, protected jsonService : JsonService) {
    }

/*    loadConfig(json,onLoaded?){
        if(this.config) return onLoaded && onLoaded(this.config);;
        this.jsonService.load(json).subscribe(config => {
            this.config = config;
            onLoaded && onLoaded(config);
        });
    }*/

    load(map, json, url, id, onLoaded?) {
        this.json = json;
        this.id = id;
        this.url = url;
        this.map = map;
        this.jsonService.load(json).subscribe(config => {
            this.config = config;
            esriLoader.loadModules(["esri/layers/ArcGISDynamicMapServiceLayer", "dojo/domReady!"])
                .then(([ArcGISDynamicMapServiceLayer]) => {
                    const layer = new ArcGISDynamicMapServiceLayer(url, {opacity: 0.8});
                    layer.id = id;
                    map.addLayer(layer);
                    onLoaded && onLoaded(layer);
                });
        });
    }

    getServiceLayer() {
        if (this.map){
            return this.map.getLayer(this.id);
        } else{
            return null;
        }
    }

    getAllLayers(){
        return this.config.layers;
    }

    getVisibleLayers() {
        if (!this.config) return [];
        const visibleLayersArray = [];
        const layers = this.getAllLayers();
        layers.forEach( layer => {
            if (layer.is_check) visibleLayersArray.push(layer.layer_index);
        });
        return visibleLayersArray;
    }

    setVisibleLayers(layerIds,clear?){
        if (clear){
            const layers = this.getAllLayers();
            layers.forEach(layer => layer.is_check = false);
        }
        layerIds.forEach( id => {
            const layer = this.getLayerByID(id);
            layer.is_check = true;
        })
        this.map && this.map.getLayer(this.id) && this.map.getLayer(this.id).setVisibleLayers(layerIds);
    }

    setLayerDefinitions(defs) {
        this.map.getLayer(this.id).setLayerDefinitions(defs);
    }

    getLayerDefinitions() {
        return this.map.getLayer(this.id).layerDefinitions;
    }

    init() {
        if (!this.config || !this.map) return;
        const array = this.getVisibleLayers();
        this.map && this.map.getLayer(this.id) && this.map.getLayer(this.id).setVisibleLayers(array);
    }

    refresh() {
        if (!this.config || !this.map) return;
        const array = this.getVisibleLayers();
        this.map && this.map.getLayer(this.id) && this.map.getLayer(this.id).setVisibleLayers(array);
    }

    clear(){
        if (!this.config) return;
        const layers = this.getAllLayers();
        layers.forEach(layer => layer.is_check = false);
        this.map && this.map.getLayer(this.id) && this.map.getLayer(this.id).setVisibleLayers([]);
    }

    getLayerByID(id){
        return this.getAllLayers().find(item => item.layer_index === id);
    }

    getLayerByName(name) {
        return this.getAllLayers().find(item => item.layer_name === name);
    }

    getLayerByDisplayName(name) {
        return this.getAllLayers().find(item => item.display_name === name);
    }

}
