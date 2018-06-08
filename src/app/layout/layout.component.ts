import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../login/auth.service";
import {ConfigService} from "../core/config/config.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {Router} from "@angular/router";
import {UserLogService} from "../shared/user/user-log.service";
import {SocketService} from "../shared/util/socket.service";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

    //auto_refresh_subscription: any;

    constructor(public authService: AuthService, public configService: ConfigService, private socketService: SocketService, private userLogService: UserLogService, private router: Router) {
        document.title = this.configService.app.title
        //this.authService.getUserFromStorage();
    }

    ngOnInit() {
        /*this.auto_refresh_subscription = Observable.interval(1000 * 60 * 60 * 24).subscribe(() => {
            this.authService.verify().subscribe(res => {
                if (res.result) {
                    this.authService.setToken(res.user, res.token);
                } else {
                    this.router.navigate(['/login']);
                }
            });
        });*/

        /*this.socketService.connect();
        this.socketService.socket.on('connect', () => {
            this.socketService.socket.emit('login', this.authService.user);
        });
        this.socketService.socket.on('login', data => {
            this.socketService.notify(data);
        });
        this.socketService.socket.on('logout', data => {
            this.socketService.notify(data);
        });
        this.socketService.socket.on('kick', data => {
            this.socketService.notify(data);
            this.logout();
        });*/


    }

    logout() {
        /*this.userLogService.create({
            action: '登出',
            user: this.authService.user
        }).subscribe();
        this.authService.logout();
        this.router.navigate(['/login']);*/
    }


    ngOnDestroy(): void {
        //this.auto_refresh_subscription && this.auto_refresh_subscription.unsubscribe();
        //this.socketService.disconnect();
    }

}
