// Services
import { Component, Input } from 'angular2/core';

// Sub components
import { NgFor, NgIf } from 'angular2/common';
import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

@Component({
    selector: 'character-details-items',
    directives: [SortableBoxes, SortableBox, NgFor, NgIf],
    template: require('./character-details-items.html')
})
export class CharacterDetailsItems {

    @Input() items : Item[];

    listener : EventListener;

    constructor () {

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

    clickCard (event : Event) : void {
        let target : Element = <Element>event.currentTarget;
        target.classList.add('is-active');

        // Without the timeout the new event listener is instantly triggered
        setTimeout(() => {
            window.addEventListener('click', this.listener);
        }, 0);
    }

}
