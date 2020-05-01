import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {TokenHandlerService} from '../service/token-handler.service';

@Injectable({
    providedIn: "root"
})
export class DashboardAuthGuard implements CanActivate{
    constructor(private _tokenSevice: TokenHandlerService, private _router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this._tokenSevice._getToken()) {
            return true
        } else {
            this._router.navigate(['/login'], {
                queryParams: {
                  return: state.url
                }
              });
              return false;
        }
    }
}