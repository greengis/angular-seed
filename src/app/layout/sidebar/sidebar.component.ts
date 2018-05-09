import {Component, OnInit, Injector} from '@angular/core';
import {Router} from '@angular/router';

import {MenuService, MenuItem} from "../../core/menu/menu.service";
import {AuthService} from "../../login/auth.service";
import {ConfigService} from "../../core/config/config.service";
import {UserLogService} from "../../shared/user/user-log.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    hover: boolean;
    menuItems: MenuItem[];
    router: Router;

    constructor(public configService: ConfigService, private userLogService: UserLogService, public menu: MenuService, public authService: AuthService, public injector: Injector) {
        menu.getMenu().subscribe(result => {
            this.menuItems = result
        });
    }

    ngOnInit() {
        this.router = this.injector.get(Router);
        this.router.events.subscribe((val) => {
            // this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
        });
    }

    logout(){
        this.userLogService.create({
            action : '登出',
            user : this.authService.user
        }).subscribe();
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
