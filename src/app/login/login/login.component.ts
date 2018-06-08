import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {default as swal} from 'sweetalert2';
import {ConfigService} from "../../core/config/config.service";
import {JsonService} from "../../shared/util/json.service";
import {PrivilegeService} from "../../shared/user/privilege.service";
import {UserLogService} from "../../shared/user/user-log.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any = {
        username : "",
        password: ""
    };

    constructor(public configService: ConfigService, private userLogService: UserLogService, private jsonService: JsonService, private privilegeService:PrivilegeService, private router: Router, private authService: AuthService) {
        document.title = this.configService.app.title
    }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['/dashboard']);
        /*this.authService.login(this.user)
            .subscribe(res => {
                if(res.result){
                    this.authService.setUserToStorage(res.data);
                    this.router.navigate(['/dashboard']);
                    this.userLogService.create({
                        action : '登入',
                        user : this.authService.user
                    }).subscribe();
                }else{
                    swal({
                        title: '登录失败',
                        text: res.msg,
                        type: 'warning',
                        confirmButtonText: '确认'
                    });
                }
            }, err => {
                swal({
                    title: '登录失败',
                    text: err.msg,
                    type: 'warning',
                    confirmButtonText: '确认'
                })
            });*/

    }

}
