// Services
import { Component, Input, EventEmitter, Output, Inject, OnChanges, SimpleChange } from 'angular2/core';
import { NgIf } from 'angular2/common';

// Style
import './character-details.less';
import {CharacterService} from '../../../service/character-service';

@Component({
    selector: 'character-details',
    template: require('./character-details.html')
})
export class CharacterDetails {

    @Input() active : boolean = true;
    @Input() selectedCharacterId : number;
    @Input() characterIds : number[];
    character : CharacterModel = {
        'id': 0,
        'name': '--',
        'image': '',
        'experience': 0,
        'description': '',
        'achievements': [],
        'items': []
    };
    tab : string = 'items';

    // Needed for two way binding
    @Output() activeChange : EventEmitter<boolean> = new EventEmitter();

    constructor (@Inject(CharacterService) private characterService : CharacterService) {

        // Close on esape keypress
        document.addEventListener('keyup', (event : KeyboardEvent) => {
            if (event.keyCode == 27) { // escape key maps to keycode `27`
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
    }

    ngOnChanges (changes : {[propName: string]: SimpleChange}) : void {
        if (!!changes['selectedCharacterId']) {
            this.characterService.getCharacterByID(this.selectedCharacterId).then((character : CharacterModel) => {
                this.character = character;
            });
        }
    }

}
