// Serivces
import { Component, Input, ElementRef } from 'angular2/core';
import { NgIf } from 'angular2/common';
import {HorizontalMenu} from '../horizontal-menu';

// Style
import './horizontal-menu-entry.less';

@Component({
    selector: 'horizontal-menu-entry',
    template: require('./horizontal-menu-entry.html')
})
export class HorizontalMenuEntry {

    @Input() text : string;
    showSub : boolean;

    constructor (private menu : HorizontalMenu) {}

    toggleSub () : void {
        this.showSub = !this.showSub;
    }

}
