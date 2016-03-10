import { Injectable } from 'angular2/core';
import { debounce, DebouncedFunction } from '../util/debounce-util';

const MOBILE_BREAKPOINT : number = 600;
const TABLET_BREAKPOINT : number = 1000;
const DESKTOP_BREAKPOINT : number = 1400;

enum VIEWMODE {
    MOBILE,
    TABLET,
    DESKTOP,
    LARGE_DESKTOP
}

@Injectable()
export class ResponsivenessService {

    currentMode : VIEWMODE;

    private onMobile : (() => void)[] = [];
    private onTablet : (() => void)[] = [];
    private onDesktop : (() => void)[] = [];
    private onLargeDesktop : (() => void)[] = [];

    constructor () {

        let refresh : DebouncedFunction = debounce(this.update.bind(this), 250);

        window.addEventListener('resize', refresh);
        window.addEventListener('load', refresh);
        window.addEventListener('DOMContentLoaded', refresh);

        refresh();
    }

    // Mobile
    addOnMobile (func : () => void) {
        this.onMobile.push(func);
    }

    removeOnMobile (func : () => void) {
        let index : number = this.onMobile.indexOf(func);
        if (index > -1) {
            this.onMobile.splice(index, 1);
        }
    }

    // Tablet
    addOnTablet (func : () => void) {
        this.onTablet.push(func);
    }

    removeOnTablet (func : () => void) {
        let index : number = this.onTablet.indexOf(func);
        if (index > -1) {
            this.onTablet.splice(index, 1);
        }
    }

    // Desktop
    addonDesktop (func : () => void) {
        this.onDesktop.push(func);
    }

    removeonDesktop (func : () => void) {
        let index : number = this.onDesktop.indexOf(func);
        if (index > -1) {
            this.onDesktop.splice(index, 1);
        }
    }

    // Large Desktop
    addonLargeDesktop (func : () => void) {
        this.onLargeDesktop.push(func);
    }

    removeonLargeDesktop (func : () => void) {
        let index : number = this.onLargeDesktop.indexOf(func);
        if (index > -1) {
            this.onLargeDesktop.splice(index, 1);
        }
    }

    update () : void {

        let newMode : number = window.innerWidth < MOBILE_BREAKPOINT ? VIEWMODE.MOBILE :
            window.innerWidth < TABLET_BREAKPOINT ? VIEWMODE.TABLET :
                window.innerWidth < DESKTOP_BREAKPOINT ? VIEWMODE.DESKTOP : VIEWMODE.LARGE_DESKTOP;

        if (newMode === this.currentMode) {
            return;
        }

        this.currentMode = newMode;

        if (this.currentMode === VIEWMODE.MOBILE) {
            this.onMobile.forEach((func : Function) => {
                func();
            });
        }

        if (this.currentMode === VIEWMODE.TABLET) {
            this.onTablet.forEach((func : Function) => {
                func();
            });
        }

        if (this.currentMode === VIEWMODE.DESKTOP) {
            this.onDesktop.forEach((func : Function) => {
                func();
            });
        }

        if (this.currentMode === VIEWMODE.LARGE_DESKTOP) {
            this.onLargeDesktop.forEach((func : Function) => {
                func();
            });
        }
    }

}
