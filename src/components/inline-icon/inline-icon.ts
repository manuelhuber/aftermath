// Serivces
import { Component, Inject, Input, Directive } from 'angular2/core';

import './../../assets/inline-icons.svg';

@Component({
    selector: 'inline-icon',
    template: require('./inline-icon.html')
})
export class InlineIcon {

    @Input() iconName : string;
    @Input() iconWidth : string = '100%';
    @Input() iconHeight : string = '100%';
    @Input() iconClass : string;
    @Input() iconFill : string;

}

