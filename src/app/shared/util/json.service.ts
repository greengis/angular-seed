import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JsonService {

    constructor(private http: HttpClient) {
    }

    load(url): Observable<any> {
        return this.http.get(url)
    }

}
