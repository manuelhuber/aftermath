// Serivces
import { Component, Input } from 'angular2/core';

@Component({
    selector: 'icon',
    template: require('./icon.html')
})
export class Icon {

    @Input() iconName : string;
    @Input() iconWidth : string = '100%';
    @Input() iconHeight : string = '100%';
    @Input() iconClass : string;
    @Input() iconFill : string;

}

