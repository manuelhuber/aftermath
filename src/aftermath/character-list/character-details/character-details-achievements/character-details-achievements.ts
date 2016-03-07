// Services
import { Component, Inject, Input, OnInit, OnChanges, AfterViewInit } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { CharacterService } from '../../../../service/character-service';

// Sub components
import { SortableBoxes } from '../../../../components/sortable-boxes/sortable-boxes';
import { SortableBox } from '../../../../components/sortable-boxes/sortable-box/sortable-box';

// Style
import './character-details-achievements.less';
import {AchievementModel} from '../../../../model/achievement';

@Component({
    selector: 'character-details-achievements',
    directives: [SortableBoxes, SortableBox, NgFor],
    template: require('./character-details-achievements.html')
})
export class CharacterDetailsAchievements implements OnChanges {

    @Input() achievementIds : number[];
    achievements : AchievementModel[];

    listener : EventListener;

    constructor (@Inject(CharacterService) private characterService : CharacterService) {
        this.listener = (event : Event) => {
            let cards : NodeListOf<Element> = document.getElementsByClassName('character-details-achievement-card');
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

        this.achievements = [];

        setTimeout(() => {
            this.characterService.getAchievementsForCharacter(this.achievementIds)
                .subscribe((achievements : AchievementModel[]) => {
                    this.achievements = achievements;
                });
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
