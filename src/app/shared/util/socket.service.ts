import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {ConfigService} from "../../core/config/config.service";

@Injectable()
export class SocketService {
  private baseUrl = this.configService.web_api;
  socket :any;
  constructor(private configService:ConfigService) { }

  connect(){
    this.socket = io(this.baseUrl);
  }

  disconnect(){
    this.socket && this.socket.disconnect();
  }

  notify(msg) {
    // 先检查浏览器是否支持
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // 检查用户是否同意接受通知
    else if (Notification['permission'] === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("通知", {body: msg.content, icon: 'assets/img/common/dummy.png'});
    }

    // 否则我们需要向用户获取权限
    else if (Notification['permission'] !== 'denied') {
      Notification.requestPermission(function (permission) {
        // 如果用户同意，就可以向他们发送通知
        if (permission === "granted") {
          var notification = new Notification("通知", {body: msg.content, icon: 'assets/img/common/dummy.png'});
        }
      });
    }
  }

}
