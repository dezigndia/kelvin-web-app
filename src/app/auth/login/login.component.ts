import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

import {HttpMethodsService} from '../../service/http-method.service';
import {TokenHandlerService} from '../../service/token-handler.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
    public loginForm: FormGroup;
    public submitted = false;
    private redirectUrl;

    constructor(private _fb: FormBuilder, 
                private _http: HttpMethodsService, 
                private _router: Router, 
                private _tokenHandlerService: TokenHandlerService, 
                private _activatedRoute: ActivatedRoute) {

    }
    ngOnInit() {
        this.createForm();
        this._activatedRoute.queryParams.subscribe(params => {
            this.redirectUrl = params.return || '/login';
            this._router.navigate([this.redirectUrl]);
        });
    }
    createForm() {
        this.loginForm = this._fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onLogin() {
        this.submitted = true;
        if(this.loginForm.invalid) {
            return;
        }
        this._http._postCall('authenticate/login', this.loginForm.value).subscribe(data => {
            if(data.status) {
                this.redirectUrl = Object.keys(this._activatedRoute.snapshot.queryParams).length > 0 ? this._activatedRoute.snapshot.queryParams.return : '/dashboard';
                this._tokenHandlerService._setToken(data.data.token);
                this._router.navigate([this.redirectUrl]);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'username or password is wrong',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }, err => {

        })
    }
}