// Serivces
import { Component, Inject, NgZone } from 'angular2/core';

// Style
import './horizontal-menu.less';

@Component({
    selector: 'horizontal-menu',
    template: require('./horizontal-menu.html')
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class HorizontalMenu {
    stickToTop : boolean;

    constructor (@Inject(NgZone) zone : NgZone) {
        window.onscroll = ( (event : Event) => {
            zone.run(() => {
                let anchor : HTMLElement = document.getElementById('horizontal-menu-sticky-anchor');
                let menu : HTMLElement = document.getElementById('horizontal-menu');
                // Since the width is given to the menu by the parent (and we would lose it once the menu gets the
                // "horizontal-menu-sticky" class we need to set the width explicitly.
                menu.style.width = menu.scrollWidth + 'px';
                this.stickToTop = window.pageYOffset > anchor.offsetTop - 10;
                // Remove the hardcoded width to no longer override CSS
                if (!this.stickToTop){
                    menu.style.width = '';
                }
            });
        });
    }
}
