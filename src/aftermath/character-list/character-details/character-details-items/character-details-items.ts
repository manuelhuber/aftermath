// Services
import { Component } from 'angular2/core';
import { NgFor } from 'angular2/common';

import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

// Style
import './character-details-items.less';
import {AchievementModel} from '../../../../model/achievement';

@Component({
    selector: 'character-details-items',
    directives: [SortableBoxes, SortableBox],
    template: require('./character-details-items.html')
})
export class CharacterDetailsItems {

    sortables : AchievementModel[] = [
        {
            id: 1,
            description: 'descrption for one',
            name: 'one',
            date: new Date(),
            rarity: 1
        },
        {
            id: 2,
            description: 'descrption for Two',
            name: 'Two',
            date: new Date(),
            rarity: 2
        },
        {
            id: 3,
            description: 'descrption for Three',
            name: 'Three',
            date: new Date(),
            rarity: 3
        }
    ];

}
