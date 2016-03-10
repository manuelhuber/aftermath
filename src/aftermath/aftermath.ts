import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

// Sub Components
import { System } from './content-pages/system/system';
import { World } from './content-pages/world/world';
import { Group } from './content-pages/group/group';
import { CharacterList } from  './character-list/character-list';
import { Header } from './header/header';
import { Footer } from  './footer/footer';

// Various top-level style files
import '../style/common.less';
import './content-pages/content-pages.less';
import './aftermath.less';

@Component({
    selector: 'aftermath',
    directives: [ROUTER_DIRECTIVES, CharacterList, Header, Footer],
    template: require('./aftermath.html')
})
@RouteConfig([
    {path: '/system', component: System, name: 'System'},
    {path: '/world', component: World, name: 'World'},
    {path: '/group', component: Group, name: 'Group'},
    {path: '/**', redirectTo: ['System']}
])
export class Aftermath {
}
