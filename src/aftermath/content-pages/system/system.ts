// Serivces
import { Component, Inject } from 'angular2/core';

import { HorizontalMenu } from '../../../components/horizontal-menu/horizontal-menu';
import { HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu-entry/horizontal-menu-entry';

// Style
import './system.less';

@Component({
    selector: 'system',
    directives: [HorizontalMenu, HorizontalMenuEntry],
    template: require('./system.html')
})
export class System {
}
