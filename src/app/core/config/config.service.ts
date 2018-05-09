import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable()
export class ConfigService {

    public city_list: any = {
        GuangDa :{
            data_map_server: 'http://www.ispongecity.com:6080/arcgis/rest/services/GDDataMap/MapServer',
            geometry_server: 'http://221.131.182.28:6082/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            print_server:"http://www.ispongecity.com:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
            main_map_center: {x: 119.458847, y: 32.213466, zoom: 13},
            city_info: {
                citycode: "101190301",
                city: "镇江",
                cityid: "231",
                parentid: "15"
            }
        }
    };
    public city_name: string = "GuangDa";

    public data_map_server: string = this.city_list[this.city_name].data_map_server;//'http://115.28.153.216:6080/arcgis/rest/services/YJDataMap/MapServer';
    public geometry_server: string = this.city_list[this.city_name].geometry_server;//'http://115.28.153.216:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer';
    public main_map_center = this.city_list[this.city_name].main_map_center;//{x:116.836756,y:39.973822,zoom:12};
    //public jd_api_key = "0dbbeac2e11a29c579299641bec7e7f2";
    public city_info: any = this.city_list[this.city_name].city_info;
    //public city : any = this.city_list[this.city_name];
    public image_map_server: string = this.city_list[this.city_name].image_map_server;

    public logo: any = this.city_list[this.city_name].logo;
    public splash: any = this.city_list[this.city_name].splash;
    public app: any = this.city_list[this.city_name].app;

    public data_map_config_json: any = "assets/json/map/data/" + this.city_name + ".json";

    //use
    public web_api: string = "http://115.28.153.216:3070"; //this.city_list[this.city_name].web_api;

    constructor() {
    }

}
