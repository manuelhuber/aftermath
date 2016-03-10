import { Injectable } from 'angular2/core';
import { debounce, DebouncedFunction } from '../util/debounce-util';

const MOBILE_BREAKPOINT : number = 600;
const TABLET_BREAKPOINT : number = 1000;
const DESKTOP_BREAKPOINT : number = 1400;

export enum VIEWMODE {
    MOBILE,
    TABLET,
    DESKTOP,
    LARGE_DESKTOP
}

@Injectable()
export class ResponsivenessService {

    currentMode : VIEWMODE;
    callbacks : Function[] = [];

    constructor () {

        let refresh : DebouncedFunction = debounce(this.update.bind(this), 250);

        window.addEventListener('resize', refresh);
        window.addEventListener('load', refresh);
        window.addEventListener('DOMContentLoaded', refresh);

        this.update();
    }

    onChange (func : () => any) {
        this.callbacks.push(func);
    }

    update () : void {

        let newMode : number = window.innerWidth < MOBILE_BREAKPOINT ? VIEWMODE.MOBILE :
            window.innerWidth < TABLET_BREAKPOINT ? VIEWMODE.TABLET :
                window.innerWidth < DESKTOP_BREAKPOINT ? VIEWMODE.DESKTOP : VIEWMODE.LARGE_DESKTOP;

        if (newMode === this.currentMode) {
            return;
        }

        this.currentMode = newMode;

        this.callbacks.forEach((func : Function) => {
            func();
        });
    }

}
