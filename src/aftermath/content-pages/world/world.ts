// Serivces
import { Component, Inject } from 'angular2/core';

// Sub components
import { HorizontalMenu } from '../../../components/horizontal-menu/horizontal-menu';
import { HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu-entry/horizontal-menu-entry';

@Component({
    selector: 'world',
    directives: [HorizontalMenu, HorizontalMenuEntry],
    template: require('./world.html')
})
export class World {

}
