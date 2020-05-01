import {Injectable} from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class TokenHandlerService {
    constructor() {}

    public _getToken(): string {
        return window.sessionStorage.getItem('x-user-token');
    }
    public _setToken(tokenValue): void {
        window.sessionStorage.setItem('x-user-token', tokenValue)
    }
    public _deletToken(): void {
        window.sessionStorage.clear();
    }
}