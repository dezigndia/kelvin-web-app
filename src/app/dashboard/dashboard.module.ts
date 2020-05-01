import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {SiteListComponent} from './site-list/site-list.component';

import {DashboardAuthGuard} from '../guard/dashboard-auth.guard';

const routes: Routes = [
    {path:'', canActivate: [DashboardAuthGuard], component: DashboardComponent}
]
@NgModule({
    declarations: [
        DashboardComponent,
        SiteListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        SiteListComponent
    ]
})
export class DashboardModule {
    
}