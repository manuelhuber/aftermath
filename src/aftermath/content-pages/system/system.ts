// Serivces
import { Component, Inject } from 'angular2/core';

import { HorizontalMenu, HorizontalMenuEntry } from '../../../components/horizontal-menu/horizontal-menu';

// Style
import './system.less';

@Component({
    selector: 'system',
    directives: [HorizontalMenu, HorizontalMenuEntry],
    template: require('./system.html')
})
export class System {

    print (s : string) : void {
        console.log(s);
    }
}
