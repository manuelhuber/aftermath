// Serivces
import { Component, Inject, NgZone } from 'angular2/core';

import { InlineIcon } from '../inline-icon/inline-icon';

// Style
import './horizontal-menu.less';

@Component({
    selector: 'horizontal-menu',
    template: require('./horizontal-menu.html'),
    directives: [InlineIcon]
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class HorizontalMenu {
    stickToTop : boolean;
    menuClosed : boolean;

    constructor (@Inject(NgZone) zone : NgZone) {
        window.onscroll = ( (event : Event) => {
            zone.run(() => {
                let anchor : HTMLElement = document.getElementById('horizontal-menu-sticky-anchor');
                let menu : HTMLElement = document.getElementById('horizontal-menu-sticky');
                this.stickToTop = window.pageYOffset > anchor.offsetTop - 10;
            });
        });
    }

    toggleMenu(value ?: boolean) : void {
        console.log('geb');
        this.menuClosed = value === undefined ? !this.menuClosed : value;
    }
}
