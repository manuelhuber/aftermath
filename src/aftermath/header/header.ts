/*
 * Angular 2 decorators and services
 */
import { Component, AfterViewInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import './header.less';

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

    ngAfterViewInit () : void {
        this.randomizeHeadline();

    }

    randomizeHeadline () : void {
        //Get the Header Text
        let text : HTMLElement = document.getElementById('header-text');

        // Make every letter a seperate span with class header-text-letter
        text.innerHTML = text.innerHTML.replace(/./g, '<span class=\"header-text-letter\">$&</span>');

        // Get all the letter Elements
        let letters : NodeListOf<Element> = document.getElementsByClassName('header-text-letter');
        for (let i : number = 0; i < letters.length; i++) {
            let html : HTMLElement = <HTMLElement>letters.item(i);
            // Random rotation between -5 and 5 degrees
            // Random vertical movement from -5% to 5%
            html.style.transform = 'rotate(' + (Math.floor(Math.random() * 10) - 5) + 'deg) ' +
                'translateY(' + (Math.floor(Math.random() * 10) - 5) + '%)';
        }
    }

}
