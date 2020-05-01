import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

import {TokenHandlerService} from '../../service/token-handler.service'

@Component({
    selector: 'app-site-list',
    templateUrl: 'site-list.component.html'
})
export class SiteListComponent {
    @Input('sitelist') list: Array<any>;

    constructor(private _router: Router, private _token: TokenHandlerService) {

    }
    public onLogout() {
        this._token._deletToken();
        this._router.navigate(['/login']);
    }
    
}