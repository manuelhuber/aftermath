// Serivces
import { Component, Input } from 'angular2/core';

// Style
import './sortable-box.less';

@Component({
    selector: 'sortable-box',
    template: require('./sortable-box.html')
})
/**
 * A horizontal menu, to be filled with horizontal menu entries
 * Subentries are possible, but so far only 1 sublevel is actually styled.
 * Sticks to the top of the screen when scrolling down
 */
export class SortableBox {

    @Input() sortable : Sortable;

}
