import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./login/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.canActivate()){
      if (next.data && next.data.module){
/*        const role = this.authService.hasPrivilege(next.data.module);
        if (role){
          return this.verify();
        }else{
          this.router.navigate(['/login']);
          return false;
        }*/
        return this.auth(next.data.module);
      }else{
        return this.verify();
        /*return this.authService.verify()
            .map(res => {
              if (res.result) {
                this.authService.setToken(res.token);
                return true;
              } else {
                this.router.navigate(['/login']);
                return false;
              }
            });*/
      }
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

  /*async verify2():Promise<boolean> {
    const result = await this.authService.verify2();
    if ( result ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }*/

  async verify(): Promise<boolean> {
    const res = await this.authService.verify().toPromise();
    if ( res.result ) {
      this.authService.setToken(res.user ,res.token);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  async auth(module_name): Promise<boolean> {
    const res = await this.verify();
    if ( res ) {
      const role = this.authService.hasPrivilege(module_name);
      if(role){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
