import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  private baseUrl = this.configService.web_api +  '/users';  // URL to web API
  constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) { }

  create(user: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/create", { user : user }, options);
  }

  delete(id:string) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id + "/remove",options);
  }

  update(user: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + user._id + "/update", { user : user }, options);
  }

  password(user: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + user._id + "/password", { user : user }, options);
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

  getDesignWorker() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/design/worker", options);
  }
  getConstructWorker() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/construct/worker", options);
  }
  getSupervisionWorker() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/supervision/worker", options);
  }
  getMaintainWorker() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/maintain/worker", options);
  }
  getEmergencyWorker() :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/emergency/worker", options);
  }

}
