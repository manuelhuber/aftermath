import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { System } from './content-pages/system/system';
import { CharacterList } from  './character-list/character-list';
import { Header } from './header/header';

import '../style/common.less';
import './content-pages/content-pages.less';
import './aftermath.less';

@Component({
    selector: 'aftermath',
    directives: [ROUTER_DIRECTIVES, CharacterList, Header],
    template: require('./aftermath.html')
})
@RouteConfig([
    {path: '/system', component: System, name: 'System'},
    {path: '/**', redirectTo: ['System']}
])
export class Aftermath {
}
