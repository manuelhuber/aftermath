// Serivces
import { Component, Inject, Input,  } from 'angular2/core';

import { InlineIcon } from '../inline-icon/inline-icon';

// Style
import './sortable-boxes.less';
import {AchievementModel} from '../../model/achievement';

@Component({
    selector: 'sortable-boxes',
    template: require('./sortable-boxes.html'),
    directives: [InlineIcon]
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class SortableBoxes {

    @Input() sortables : sortable[];
    a : AchievementModel;

}
