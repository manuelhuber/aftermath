import { Component } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { Login } from './login/login';
import { TownOverview} from  './town/town-overview';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template : require('./app.html')
})
@RouteConfig([
{path: '/', component: Login, name: 'Login'},
{path: '/town', component: TownOverview, name: 'Town'},
{path: '/**', redirectTo: ['/Login']}
])
export class App {}
