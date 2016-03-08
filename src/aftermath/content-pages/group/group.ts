// Serivces
import { Component, Inject } from 'angular2/core';

import { HorizontalMenu } from '../../../components/horizontal-menu/horizontal-menu';
import { HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu-entry/horizontal-menu-entry';

@Component({
    selector: 'group',
    directives: [HorizontalMenu, HorizontalMenuEntry],
    template: require('./group.html')
})
export class Group {
}
