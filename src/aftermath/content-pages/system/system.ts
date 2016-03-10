// Serivces
import { Component, Inject } from 'angular2/core';

// Sub components
import { HorizontalMenu } from '../../../components/horizontal-menu/horizontal-menu';
import { HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu-entry/horizontal-menu-entry';
import { RollSimulator } from './roll-simulator/roll-simulator';

// Style
import './system.less';

@Component({
    selector: 'system',
    directives: [HorizontalMenu, HorizontalMenuEntry, RollSimulator],
    template: require('./system.html')
})
export class System {

}
