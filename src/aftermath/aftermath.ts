import { Component } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { Login } from './login/login';
import { TownOverview } from  './town/town-overview';
import { CharacterList } from  './character-list/character-list';
import { Header } from './header/header';

import '../style/common.less';
import './aftermath.less';

@Component({
    selector: 'aftermath',
    directives: [ROUTER_DIRECTIVES, CharacterList, Header],
    template: require('./aftermath.html')
})
@RouteConfig([
    {path: '/', component: Login, name: 'Login'},
    {path: '/town', component: TownOverview, name: 'Town'},
    {path: '/**', redirectTo: ['/Login']}
])
export class Aftermath {
}
