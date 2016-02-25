// Serivces
import { Component, Inject } from 'angular2/core';
import { NgIf } from 'angular2/common';

// Style
import './roll-simulator.less';

@Component({
    selector: 'roll-simulator',
    directives: [NgIf],
    template: require('./roll-simulator.html')
})
export class RollSimulator {

    baseNumber : number = 64;
    modifierNumber : number = 040;

    constructor () {
        console.log();
    }

    getModifierHeight () : number {
        return Math.abs(this.modifierNumber) * 0.7;
    }

}
