// Serivces
import { Component, Input } from 'angular2/core';
import { NgIf } from 'angular2/common';

// Subcomponents
import './../../../assets/inline-icons.svg';

// Style
import './horizontal-menu.less';

@Component({
    selector: 'horizontal-menu',
    template: require('./horizontal-menu.html')
})
export class HorizontalMenu {
    @Input() title : string;
}

@Component({
    selector: 'horizontal-menu-entry',
    template: require('./horizontal-menu-entry')
})
export class HorizontalMenuEntry {

    @Input() text : string;
    showSub : boolean;

    constructor(private menu : HorizontalMenu){}

    toggleSub () : void {
        this.showSub = !this.showSub;
    }
}
