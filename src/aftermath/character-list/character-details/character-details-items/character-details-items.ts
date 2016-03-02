// Services
import { Component, Inject, Input, OnInit, OnChanges } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { CharacterService } from '../../../../service/character-service';

// Sub components
import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

// Style
import './character-details-items.less';
import {AchievementModel} from '../../../../model/achievement';
import {ItemModel} from '../../../../model/item';

@Component({
    selector: 'character-details-items',
    directives: [SortableBoxes, SortableBox],
    template: require('./character-details-items.html')
})
export class CharacterDetailsItems implements OnChanges {

    @Input() character : CharacterModel;
    items : ItemModel[];

    constructor (@Inject(CharacterService) private characterService : CharacterService) {}

    ngOnChanges (changes : {}) : any {
        this.characterService.getItemsForCharacter(this.character).subscribe((items : ItemModel[]) => {
            this.items = items;
        });
    }

}
