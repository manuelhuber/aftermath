// Serivces
import { Component, Inject, Input, ContentChildren, QueryList, AfterViewInit, OnChanges } from 'angular2/core';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';

import { SortableBox } from './sortable-box/sortable-box';

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
    template: require('./sortable-boxes.html')
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
    boxHeight : number = 230;

    reverseSort : number = 1;
    lastSort : number = -1;

    ngAfterViewInit () : any {
        this.initiateView();
    }

    ngOnChanges (changes : {}) : any {
        this.initiateView();
    }

    get coloumnCount () : number {
        return 4;
    }

    initiateView () : void {
        setTimeout(() => {
            if (this.updateHtmlVariables()) {
                this.positionBoxes(true);
            }
        }, 1000);
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
            this.htmlEntries[i].style.height = this.boxHeight + 'px';
        }
        let scrollable : HTMLElement = <HTMLElement> document.getElementsByClassName('sortable-boxes-scrollable')[0];
        scrollable.style.height = Math.floor(this.htmlEntries.length / this.coloumnCount) * this.boxHeight + 'px';
        return true;
    }

    positionBoxes (firstTime : boolean = false) : void {
        let column : number = 0;
        let row : number = 0;

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

}
