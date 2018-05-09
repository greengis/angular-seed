import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from "../core/config/config.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {

    localstorage_user_key : string = this.configService.city_name.toLowerCase() + '_sc_user';

    user: any;
    private baseUrl = this.configService.web_api + '/users';  // URL to web API
    private authUrl = this.configService.web_api + '/auth';

    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    register(user: any): any {
        return this.http.post(this.authUrl + "/register/email", {user: user});
    }

    weixin(code: string): any {
        return this.http.get(this.authUrl + "/weixin/userinfo/" + code);
    }

    loginWeixin(userid: string): any {
        return this.http.post(this.authUrl + "/login/weixin", {weixin: userid});
    }

    bind(user: any): any {
        return this.http.post(this.authUrl + "/bind/weixin", {user: user});
    }

    login(user: any): any {
        return this.http.post(this.authUrl + "/login/username", {user: user});
    }

    update(user: any): any {
        let headers = this.getHeader();
        let options = {headers: headers};
        return this.http.post(this.baseUrl + "/" + user._id + "/update", {user: user}, options);
    }

    verify() : any {
        const user = this.getUserFromStorage();
        return this.http.post(this.authUrl + "/verify", {token: user.token});
    }

    /*async verify2(): Promise<boolean> {
        const user = this.getUserFromStorage();
        const response:any = await this.http.post(this.authUrl + "/verify", {token: this.user.token}).toPromise();
        if (response.result) {
            this.setToken(response.token);
        }
        return response.result;
    }*/

    getToken() {
        return this.getUserFromStorage().token;
    }

    setToken(user, token) {
        this.user = user;
        this.user.token = token;
        const group = this.user.group;
        delete this.user.group;
        this.setUserToStorage(this.user);
        this.user.group = group;
    }

    getHeader() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()
        });
    }

    getUserFromStorage() {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem(this.localstorage_user_key));
        }
        return this.user;
    }

    setUserToStorage(user: any) {
        this.user = user;
        localStorage.setItem(this.localstorage_user_key, JSON.stringify(user));
    }

    logout() {
        this.user = null;
        localStorage.removeItem(this.localstorage_user_key);
    }

    hasPrivilege(name):boolean {
        const user = this.getUserFromStorage();
        const privilege = user.group.privileges.find(p =>{ return p.name === name; });
        return privilege !=  undefined;
    }

    canActivate() {
        if (localStorage.getItem(this.localstorage_user_key)) {
            return true;
        } else {
            return false;
        }
    }
}
