/*
 * Angular 2 decorators and services
 */
import { Component, AfterViewInit } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import './header.less';
import {Login} from '../login/login';
import {TownOverview} from '../town/town-overview';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'header',
    directives: [ROUTER_DIRECTIVES],
    template: require('./header.html')
})
export class Header implements AfterViewInit {

    ngAfterViewInit () : any {
        let text : HTMLElement = document.getElementById('header-text');
        text.innerHTML = text.innerHTML.replace(/./g, '<div class=\"header-text-letter\">$&</div>');

        let letters : NodeListOf<Element> = document.getElementsByClassName('header-text-letter');
        for (let i : number = 0; i < letters.length; i++) {
            let html : HTMLElement = <HTMLElement>letters.item(i);
            html.style.transform = 'rotate(' + (Math.floor(Math.random() * 10) - 5) + 'deg) ' +
                'translateY(' + (Math.floor(Math.random() * 10) - 5) + '%)';
        }
    }

}
