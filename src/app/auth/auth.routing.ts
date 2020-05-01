import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

import {AuthGuard} from '../guard/auth.guard';

const routes: Routes = [
    {   path: '', 
        component: AuthComponent,
        children: [
            { path: 'login', canActivate: [AuthGuard] ,component:LoginComponent},
            { path: 'signup', component:SignupComponent},
            { path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);