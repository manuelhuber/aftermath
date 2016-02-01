/*
 * Angular 2 decorators and services
 */
import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Login} from './login/login';
import {Town} from './town/town';
import './app.less';

@Component({
    selector: 'app',
})
@RouteConfig([
    {path: '/', component: Login, name: 'Login'},
    {path: '/town', component: Town, name: 'Town'},
    {path: '/**', redirectTo: ['/Login']}
])
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl : 'app/app.html'
})
export class App {}
