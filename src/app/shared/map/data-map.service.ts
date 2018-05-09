import {Injectable} from '@angular/core';
import {BaseMapService} from "./base-map.service";

@Injectable()
export class DataMapService extends BaseMapService {

    load(map, onLoaded?) {
        super.load(map, this.configService.data_map_config_json, this.configService.data_map_server, "data-map", layer => {
            onLoaded && onLoaded(layer);
        });
    }

    getAllLayers() {
        let layers = [];
        Object.keys(this.config.layers).forEach(key => {
            layers = layers.concat(this.config.layers[key]);
        });
        return layers;
    }

    getProjectLayer() {
        return this.getLayerByName("project");
        //return this.config.layers.sponge_layers[0];
    }

    getLIDLayer() {
        return this.getLayerByName("lid");
    }

    getBoundaryLayer() {
        return this.getLayerByName("partition_boundary");
    }
}
