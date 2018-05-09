import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GroupService {

  private baseUrl = this.configService.web_api +  '/groups';  // URL to web API
  constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) { }

  create(group: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/create", { group : group }, options);
  }

  delete(id:string) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id + "/remove",options);
  }

  update(group: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + group._id + "/update", { group : group }, options);
  }

  getAll() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/", options);
  }

  getOne(id:string):  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/id/" + id,options);
  }

}
