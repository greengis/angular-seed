import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MenuService {

  //menuItems: MenuItem[];

  constructor(private http : HttpClient) {

  }

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("assets/json/menus.json");
  }
}

export interface MenuItem {
  text: string,
  heading?: boolean,
  label?: string,
  link?: string,     // internal route links
  elink?: string,    // used only for external links
  target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
  icon?: string,
  alert?: string,
  submenu?: MenuItem[]
}

export type MenuResponse = { [name: string]: MenuItem[] };
