// Serivces
import { Component, Input, ElementRef, ContentChildren, QueryList, AfterContentInit } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { HorizontalMenu } from '../horizontal-menu';
import { scrollSmooth } from '../../../util/scroll-util';
import { Icon } from '../../icon/icon';

// Style
import './horizontal-menu-entry.less';

@Component({
    selector: 'horizontal-menu-entry',
    template: require('./horizontal-menu-entry.html'),
    directives: [Icon]
})
export class HorizontalMenuEntry implements AfterContentInit {

    // The actual text of the menu entry
    @Input() text : string;
    // The HTML ID of the element to scrollTo
    @Input() scrollTo : string;
    // Function that will be called on click
    @Input('onClick') inputFunction : () => void;

    // The content of this component. It contains at least 1 HorizontalMenuEntry (itself)
    //noinspection TypeScriptValidateTypes
    @ContentChildren(HorizontalMenuEntry) children : QueryList<HorizontalMenuEntry>;

    showSub : boolean;
    hasSub : boolean;

    /**
     * Check for subs, once the content is initialized
     */
    ngAfterContentInit () : any {
        // If there are more than 1 menu entry in this component = there is a sub
        this.hasSub = this.children.length > 1;
    }

    /**
     * Toggle the Sub menu
     * if scrollTo Element is set, scroll to it
     * if other function is given, call it
     * @param event
     */
    onClick (event : Event) : void {

        // Open the subs when clicking on the menu entry
        this.toggleSub(true);

        if (this.scrollTo) {
            scrollSmooth(document.getElementById(this.scrollTo));
        }

        if (this.inputFunction) {
            this.inputFunction();
        }
    }

    /**
     * Toggles the sub menu entries with the given value (if given)
     * Otherwise it just toggles to the other state.
     * If there are no entries, nothing happens
     */
    toggleSub (toggle ? : boolean) : void {
        this.showSub = toggle !== undefined ? toggle : !this.showSub;
    }

    /**
     * Toggles the subs and stops the event from bubbling up
     */
    closeClick(event : Event) : void {
        this.toggleSub();
        event.stopPropagation();
    }

}
