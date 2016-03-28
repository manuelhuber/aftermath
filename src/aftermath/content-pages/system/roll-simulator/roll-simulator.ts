// Serivces
import { Component, Inject } from 'angular2/core';
import { NgIf, NgStyle } from 'angular2/common';

// Style
import './roll-simulator.less';

@Component({
    selector: 'roll-simulator',
    directives: [NgIf, NgStyle],
    template: require('./roll-simulator.html')
})
export class RollSimulator {

    baseNumber : number = 36;
    modifierNumber : number = 25;
    rollNumber : number;

    checkFailed : boolean;

    get targetNumber () : number {
        return this.baseNumber + this.modifierNumber;
    }

    get modifierPosition () : number {
        return this.baseNumber + this.modifierNumber / 2;
    }

    get modifierHeight () : number {
        return Math.abs(this.modifierNumber) * 0.7;
    }

    get result () : number {
        if (this.rollNumber > this.targetNumber) {
            this.checkFailed = true;
            return this.getDegreesOfResult(this.rollNumber, this.targetNumber);
        } else {
            this.checkFailed = false;
            return this.getDegreesOfResult(this.targetNumber, this.rollNumber);
        }
    }

    rollD100 () : void {
        this.rollNumber = Math.floor(Math.random() * 100) + 1;
    }

    getDegreesOfResult (biggerNumber : number, smallerNumber : number) : number {
        return 1 + (Math.floor(biggerNumber / 10) - (Math.floor(smallerNumber / 10)));
    }

}
