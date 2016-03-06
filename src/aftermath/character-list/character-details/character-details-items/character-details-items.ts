// Services
import { Component, Inject, Input, OnChanges } from 'angular2/core';
import { NgFor, NgIf } from 'angular2/common';
import { CharacterService } from '../../../../service/character-service';

// Sub components
import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

// Style
import './character-details-items.less';
import { ItemModel } from '../../../../model/item';
import { CharacterDetailsModel } from '../../../../model/character-details';

@Component({
    selector: 'character-details-items',
    directives: [SortableBoxes, SortableBox, NgFor, NgIf],
    template: require('./character-details-items.html')
})
export class CharacterDetailsItems implements OnChanges {

    @Input() details : CharacterDetailsModel;
    items : ItemModel[];

    listener : EventListener;

    constructor (@Inject(CharacterService) private characterService : CharacterService) {

        this.listener = (event : Event) => {
            let cards : NodeListOf<Element> = document.getElementsByClassName('character-details-items-card');
            for (let i : number = 0; i < cards.length; i++) {
                let cardElement : HTMLElement = <HTMLElement>cards.item(i);
                cardElement.classList.remove('is-active');
            }

            setTimeout(() => {
                window.removeEventListener('click', this.listener);
            }, 0);
        };

    }

    ngOnChanges (changes : {}) : any {

        // This is needed so that on character change all items are removed and then readded from scratch

        this.items = [];

        setTimeout(() => {
            //this.characterService.getItemsForCharacter(this.character).subscribe((items : ItemModel[]) => {
            //    this.items = items;
            //});
        }, 0);
    }

    clickCard (event : Event) : void {
        let target : Element = <Element>event.currentTarget;
        target.classList.add('is-active');

        // Without the timeout the new event listener is instantly triggered
        setTimeout(() => {
            window.addEventListener('click', this.listener);
        }, 0);
    }

}
