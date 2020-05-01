import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {TokenHandlerService} from '../service/token-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _tokenService: TokenHandlerService) {

    }
    canActivate() {
        if(this._tokenService._getToken()) {
            this._router.navigate(['/dashboard']);
            return false;
        }
        return  true;
    }
}