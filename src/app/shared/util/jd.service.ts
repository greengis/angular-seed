import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from "../../core/config/config.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JdService {
  private baseUrl = this.configService.web_api;
  constructor(private http: HttpClient, private configService: ConfigService) { }

  weather() :  Observable<any> {
    return this.http.post(this.baseUrl + '/weather', {city_info: this.configService.city_info});
  }

}
