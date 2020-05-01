import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {HttpMethodsService} from '../service/http-method.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    public sitelist = [];
    public addSite: Boolean = false;
    constructor(private _http: HttpMethodsService) {

    }
    ngOnInit() {
        this.sitelist = [
            {title: "Facebook", path: "www.facebook.com"},
            {title: "Linked In", path: "www.facebook.com"},
            {title: "Twitter", path: "www.facebook.com"},
        ];
        this.getAllWebList();
    }
    getAllWebList() {
        this._http._getCall('user/getAllWebList').subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
    addNewSite(name) {
        if(name) {
            this.sitelist.push({title: name, path: "name"});
        }
        // alert(name);
    }
}