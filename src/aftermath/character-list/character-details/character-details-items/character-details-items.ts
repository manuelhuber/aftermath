// Services
import { Component } from 'angular2/core';

import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

// Style
import './character-details-items.less';

@Component({
    selector: 'character-details-items',
    directives: [ SortableBoxes, SortableBox ],
    template: require('./character-details-items.html')
})
export class CharacterDetailsItems {

}
