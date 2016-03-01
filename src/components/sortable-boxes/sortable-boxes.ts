// Serivces
import { Component, Inject, Input, ContentChildren, QueryList, AfterContentInit } from 'angular2/core';

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
export class SortableBoxes implements AfterContentInit{

    //noinspection TypeScriptValidateTypes
    @ContentChildren(SortableBox) sortables : QueryList<SortableBox> ;
    a : AchievementModel;

    ngAfterContentInit () : any {
        console.log(this.sortables.first.sortable.date);
    }

}
