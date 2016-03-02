// Serivces
import { Component, Inject, Input, ContentChildren, QueryList, AfterViewChecked } from 'angular2/core';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';

import { SortableBox } from './sortable-box/sortable-box';

// Style
import './sortable-boxes.less';
import {AchievementModel} from '../../model/achievement';

@Component({
    selector: 'sortable-boxes',
    template: require('./sortable-boxes.html')
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class SortableBoxes implements AfterViewChecked {

    //noinspection TypeScriptValidateTypes
    @ContentChildren(SortableBox) sortables : QueryList<SortableBox>;
    a : AchievementModel;
    htmlEntries : HTMLElement[];
    boxWidth : string;

    ngAfterViewChecked () : any {
        if (this.updateHtmlVariables()) {
            this.initializeBoxes();
        }
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
        console.log(this.htmlEntries[0]);
        return true;
    }

    initializeBoxes () : void {
        this.htmlEntries.forEach((element : HTMLElement, index : number) => {
            element.style.left = index * 25 + '%';
        });
    }

}
