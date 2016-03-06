// Services
import { Component, Input, EventEmitter, Output, Inject, OnChanges, SimpleChange, AfterContentInit }
    from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Observable } from 'rxjs/Rx';
import { CharacterService } from '../../../service/character-service';
import { Icon } from '../../../components/icon/icon';
import { CharacterDetailsItems } from './character-details-items/character-details-items';
import { CharacterDetailsAchievements } from './character-details-achievements/character-details-achievements';

// Style
import './character-details.less';
import './character-details-sortables.less';
import {CharacterDetailsModel} from '../../../model/character-details';

@Component({
    selector: 'character-details',
    directives: [Icon, NgIf, CharacterDetailsItems, CharacterDetailsAchievements],
    template: require('./character-details.html')
})
export class CharacterDetails {

    @Input() active : boolean = true;
    @Input() selectedCharacterId : number;
    @Input() characterIds : number[];
    tab : string = 'items';
    character : CharacterModel = {
        'id': 0,
        'name': '--',
        'image': '',
        'achievements': [],
    };
    details : CharacterDetailsModel;

    // Needed for two way binding
    @Output() activeChange : EventEmitter<boolean> = new EventEmitter();

    constructor (@Inject(CharacterService) private characterService : CharacterService) {

        // Close on esape keypress
        document.addEventListener('keyup', (event : KeyboardEvent) => {
            if (event.keyCode === 27) { // escape key maps to keycode `27`
                this.close();
            }
        });
    }

    /**
     * Close if the click was on the background
     */
    closeOnClick (event : Event) : void {
        let target : Element = <Element>event.target;
        if (target.classList.contains('character-details-background')) {
            this.close();
        }
    }

    /**
     * Closes the character details and also emits this change.
     */
    close () : void {
        this.active = false;
        this.activeChange.emit(false);
        document.body.style.overflow = '';
    }

    previousCharacter () : void {
        let potentialNextCharacter : number = this.characterIds.indexOf(this.selectedCharacterId) - 1;
        this.selectedCharacterId = potentialNextCharacter >= 0 ?
            this.characterIds[potentialNextCharacter] :
            this.characterIds[this.characterIds.length - 1];
        // We need to manually call it since ngOnChanges only works when in- & output changes
        this.getNewCharacterData();
    }

    nextCharacter () : void {
        let potentialNextId : number = this.characterIds.indexOf(this.selectedCharacterId) + 1;
        this.selectedCharacterId = potentialNextId < this.characterIds.length ?
            this.characterIds[potentialNextId] : this.characterIds[0];
        // We need to manually call it since ngOnChanges only works when in- & output changes
        this.getNewCharacterData();
    }

    /**
     * Will only be called when in- & output changes, for example selecting a character via character list
     */
    ngOnChanges (changes : {[propName: string]: SimpleChange}) : void {
        if (!!changes['selectedCharacterId']) {
            this.getNewCharacterData();
        }
        if (!!changes['active']) {
            if (changes['active'].currentValue) {
                document.body.style.overflow = 'hidden';
            }
        }
    }

    private getNewCharacterData () : void {
        if (!this.selectedCharacterId) {
            return;
        }

        this.characterService.getCharacterByID(this.selectedCharacterId).subscribe((character : CharacterModel) => {
            this.character = character;
        });

        this.characterService.getCharacterDetails(this.selectedCharacterId)
            .subscribe((details : CharacterDetailsModel) => {
                this.details = details;
            });
    }

}
