import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


import {HttpMethodsService} from '../../service/http-method.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit{
    public signUpForm: FormGroup;
    public submitted = false;
    public msg;

    constructor(private _fb: FormBuilder, private _http: HttpMethodsService, private _route: Router) {

    }
    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.signUpForm = this._fb.group({
            username: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            name: [null, [Validators.required]]
        })
    }
    onSignUp() {
        this.submitted = true;
        if(this.signUpForm.invalid) {
            return;
        }
        this._http._postCall('authenticate/register', this.signUpForm.value).subscribe(data => {
            if(data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: true
                }).then((result) => {
                    if (result.value) {
                        this._route.navigate(['/login']);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }, err => { 
            console.log(err);
        })
    }
    get f() { return this.signUpForm.controls; }
}