// Serivces
import { Component, Inject } from 'angular2/core';

import { HorizontalMenu } from '../../../components/horizontal-menu/horizontal-menu';
import { HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu-entry/horizontal-menu-entry';
import { RollSimulator } from './roll-simulator/roll-simulator';
import { scrollSmooth } from '../../../util/scroll-util';

// Style
import './system.less';

@Component({
    selector: 'system',
    directives: [HorizontalMenu, HorizontalMenuEntry, RollSimulator],
    template: require('./system.html')
})
export class System {

    scrollTo (event : Event, elementID : string) : void {
        // Prevent event bubbling, so the click event of parent entry is not activated
        event.stopPropagation();
        scrollSmooth(document.getElementById(elementID), 250);
    }
}
