import {Injectable}              from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {ConfigService} from "../../core/config/config.service";
import {AuthService} from "../../login/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GraphicService {
    private jsonUrl = this.configService.web_api + '/json';  // URL to web API
    private baseUrl = this.configService.web_api + '/graphics';  // URL to web API
    constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) {
    }

    load(): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        return this.http.get(this.jsonUrl + "/load", options);
    }

    save(data: any): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        return this.http.post(this.jsonUrl + "/save", {data: data}, options);
    }

    loadByUser(): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        return this.http.get(this.baseUrl + "/load/" + this.authService.user._id, options);
    }

    saveByUser(data: any): Observable<any> {
        let headers = this.authService.getHeader();
        let options = {headers: headers};
        return this.http.post(this.baseUrl + "/save", {graphic:{ geo:data, user:{_id : this.authService.user._id}} }, options);
    }
}
