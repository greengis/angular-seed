import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserLogService {
  private baseUrl = this.configService.web_api +  '/userLogs';  // URL to web API
  constructor(private http: HttpClient, private authService: AuthService, private configService: ConfigService) { }

  create(log: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/create", { log : log }, options);
  }

  delete(id:string) :  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/" + id + "/remove",options);
  }

  update(log: any): Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.post(this.baseUrl + "/" + log._id + "/update", { log : log }, options);
  }

  getByUser(id:string):  Observable<any> {
    let headers = this.authService.getHeader();
    let options = { headers: headers };
    return this.http.get(this.baseUrl + "/user/" + id,options);
  }
}
