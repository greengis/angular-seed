import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PrivilegeService {
  private baseUrl = this.configService.web_api +  '/privileges';  // URL to web API
  constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) { }

  create(privilege: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/create", { privilege : privilege }, options);
  }

  delete(id:string) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id + "/remove",options);
  }

  update(privilege: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + privilege._id + "/update", { privilege : privilege }, options);
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

  getOneByName(name:string):  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/name/" + name,options);
  }

}
