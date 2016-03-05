// Serivces
import { Component, Input, ContentChildren, QueryList, AfterViewInit, OnChanges, Inject, NgZone, ElementRef } from 'angular2/core';
import { NgIf } from 'angular2/common';

import { SortableBox } from './sortable-box/sortable-box';
import { Icon } from '../icon/icon';

// Style
import './sortable-boxes.less';
import {AchievementModel} from '../../model/achievement';

enum SORT {
    NAME,
    DATE,
    RARITY
}

@Component({
    selector: 'sortable-boxes',
    template: require('./sortable-boxes.html'),
    directives: [Icon, NgIf]
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class SortableBoxes implements AfterViewInit, OnChanges {

    @Input('sortables') sortablesInput : Sortable[];

    //noinspection TypeScriptValidateTypes
    @ContentChildren(SortableBox) sortables : QueryList<SortableBox>;
    a : AchievementModel;
    htmlEntries : HTMLElement[];
    // In percent
    boxWidth : number = 25;
    // In pixel
    boxHeight : number;

    scrollableDiv : HTMLElement;
    contentDiv : HTMLElement;

    showScroll : boolean;

    reverseSort : number = 1;
    lastSort : number = -1;

    constructor (@Inject(NgZone) private zone : NgZone, @Inject(ElementRef) element : ElementRef) {
        element.nativeElement.addEventListener("mousewheel", this.mouseWheelHandler.bind(this));
        element.nativeElement.addEventListener("DOMMouseScroll", this.mouseWheelHandler.bind(this);
        window.addEventListener('resize', () => {
            zone.run(() => {
                this.shouldWeScroll();
            });
        });

        //myimage.addEventListener("mousewheel", MouseWheelHandler, false);
        //// Firefox
        //myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }

    ngAfterViewInit () : any {
        this.initiateView();
    }

    ngOnChanges (changes : {}) : any {
        this.initiateView();
    }

    get coloumnCount () : number {
        return 4;
    }

    /**
     * Unfortunately the sortable boxes take a bit to be drawn, so we have to poll until it's done
     * This is a really hacky solution but I couldn't come up with a better solution...
     */
    initiateView () : void {
        setTimeout(() => {
            if (this.updateHtmlVariables()) {
                this.positionBoxes(true);
            } else {
                this.initiateView();
            }
        }, 100);
    }

    updateHtmlVariables () : boolean {

        let entriesList : NodeListOf<Element> = document.getElementsByClassName('sortable-box');

        if (!entriesList.length) {
            return false;
        }

        this.htmlEntries = [];
        for (let i : number = 0; i < entriesList.length; i++) {
            this.htmlEntries.push(<HTMLElement>entriesList.item(i));
            this.htmlEntries[i].style.width = this.boxWidth + '%';
        }

        this.scrollableDiv = document.getElementById('sortable-boxes-scrollable');
        this.contentDiv = document.getElementById('sortable-boxes-content');

        // Since all cards are positon absolute we need to manually set the height of the scrollable div
        this.boxHeight = this.htmlEntries[0].offsetHeight;
        this.scrollableDiv.style.height = Math.ceil(this.htmlEntries.length / this.coloumnCount) * this.boxHeight + 'px';

        // That's the only way I got the initial scrolling check to work...
        setTimeout(() => {
            this.showScroll =
                Math.ceil(this.htmlEntries.length / this.coloumnCount) * this.boxHeight > this.contentDiv.clientHeight;
        }, 0);

        return true;
    }

    positionBoxes (firstTime : boolean = false) : void {
        this.htmlEntries.forEach((element : HTMLElement, index : number) => {
            if (firstTime) {
                element.style.left = '0';
                element.style.top = '0';
            }
            setTimeout(() => {
                element.style.left = (index % this.coloumnCount) * this.boxWidth + '%';
                element.style.top = Math.floor(index / this.coloumnCount) * this.boxHeight + 'px';

            }, 0);
        });
    }

    sortByName () : void {
        this.reverseSort = (this.lastSort === SORT.NAME) ? -this.reverseSort : 1;
        this.lastSort = SORT.NAME;
        this.htmlEntries.sort(this.getSortingFunction('name', this.reverseSort));
        this.positionBoxes();
    }

    sortByDate () : void {
        this.reverseSort = (this.lastSort === SORT.DATE) ? -this.reverseSort : 1;
        this.lastSort = SORT.DATE;
        this.htmlEntries.sort(this.getSortingFunction('date', this.reverseSort));
        this.positionBoxes();
    }

    sortByRarity () : void {
        this.reverseSort = (this.lastSort === SORT.RARITY) ? -this.reverseSort : 1;
        this.lastSort = SORT.RARITY;
        this.htmlEntries.sort(this.getSortingFunction('rarity', this.reverseSort));
        this.positionBoxes();
    }

    getSortingFunction (attribute : string, reverseSort : number) : any {
        return (a : HTMLElement, b : HTMLElement) => {
            if (a.getAttribute('data-' + attribute) < b.getAttribute('data-' + attribute)) {
                return -reverseSort;
            } else if (a.getAttribute('data-' + attribute) > b.getAttribute('data-' + attribute)) {
                return reverseSort;
            } else {
                return 0;
            }
        };
    }

    /**
     * Moves the scrollable div up, so the entries further down are visible
     * Returns false if we are already at the bottom, true if we actually scrolled
     */
    scrollDown () : boolean {

        let minimumValue : number = this.contentDiv.offsetHeight - this.scrollableDiv.scrollHeight;

        // Already at the bottom
        if (this.scrollableDiv.offsetTop === minimumValue) {
            return false;
        }

        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(this.scrollableDiv).top.replace(/px/, ''), 10) - this.boxHeight / 2;
        this.scrollableDiv.style.top =
            potentialNewTopValue < minimumValue
                ? minimumValue + 'px' : potentialNewTopValue + 'px';
        return true;

    }

    /**
     * Moves the scrollable div down, so the entries further up are visible
     * Returns false if we are already at the top, true if we actually scrolled
     */
    scrollUp () : boolean {

        // Already at the top
        if (this.scrollableDiv.offsetTop === 0) {
            return false;
        }

        let potentialNewTopValue : number =
            parseInt(window.getComputedStyle(this.scrollableDiv).top.replace(/px/, ''), 10) + this.boxHeight / 2;
        this.scrollableDiv.style.top = potentialNewTopValue > 0 ? '0' : potentialNewTopValue + 'px';
        return true;
    }

    /**
     * Scrolls the sortable box according to the mouse wheel & prevents the scrolling event from bubbling
     * if the box is scrolling.
     */
    private mouseWheelHandler (event : WheelEvent) : void {
        if (this.showScroll && event.deltaY < 0) {
            if (this.scrollUp()) {
                event.preventDefault();
            }
        } else {
            if (this.scrollDown()) {
                event.preventDefault();
            }
        }
    }

    private shouldWeScroll () : void {
        this.showScroll = this.scrollableDiv.scrollHeight > this.contentDiv.clientHeight;
    }
}
