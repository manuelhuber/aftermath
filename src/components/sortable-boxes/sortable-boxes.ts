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
    boxWidth : string;
    boxHeight : string;

    reverseSort : number = 1;
    lastSort : number = -1;

    init : boolean = true;

    ngAfterViewInit () : any {
        this.redraw();
    }

    ngOnChanges (changes : {}) : any {
        console.log('fire');
        this.redraw();
    }

    get coloumnCount () : number {
        return 4;
    }

    redraw () : void {
        setTimeout(() => {
            if (this.updateHtmlVariables()) {
                console.log('after init');
                console.log(this.htmlEntries);
                this.positionBoxes();
                this.init = false;
            }
        }, 2000);
    }

    updateHtmlVariables () : boolean {
        let entriesList : NodeListOf<Element> = document.getElementsByClassName('sortable-box');
        if (!entriesList.length) {
            return false;
        }
        this.htmlEntries = [];
        for (let i : number = 0; i < entriesList.length; i++) {
            this.htmlEntries.push(<HTMLElement>entriesList.item(i));
        }
        this.boxWidth = this.htmlEntries[0].style.width;
        this.boxHeight = this.htmlEntries[0].style.height;
        return true;
    }

    positionBoxes (firstTime : boolean = false) : void {
        this.htmlEntries.forEach((element : HTMLElement, index : number) => {
            if (firstTime) {
                element.style.left = '0';
                element.style.top = '0';
            }
            element.style.left = index * 25 + '%';
        });
    }

    sortByName () : void {
        this.reverseSort = (this.lastSort === SORT.NAME) ? -this.reverseSort : 1;
        this.lastSort = SORT.NAME;
        this.htmlEntries.sort(this.getSortingFunction('name', this.reverseSort));
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
