// Services
import { Component, Input, EventEmitter, Output, Inject, OnChanges, SimpleChange, AfterContentInit } from 'angular2/core';
import { NgIf } from 'angular2/common';
import { Observable } from 'rxjs/Rx';
import { CharacterService } from '../../../service/character-service';
import { InlineIcon } from '../../../components/inline-icon/inline-icon';

// Style
import './character-details.less';

@Component({
    selector: 'character-details',
    directives: [ InlineIcon ],
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
        'experience': 0,
        'description': '',
        'achievements': [],
        'items': []
    };

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
    }

    previousCharacter () : void {
        let potentialNextCharacter : number = this.characterIds.indexOf(this.selectedCharacterId) - 1;
        this.selectedCharacterId = potentialNextCharacter >= 0 ?
            this.characterIds[potentialNextCharacter] :
            this.characterIds[this.characterIds.length - 1];
        this.getNewCharacterData();
    }

    nextCharacter () : void {
        let potentialNextId : number = this.characterIds.indexOf(this.selectedCharacterId) + 1;
        this.selectedCharacterId = potentialNextId < this.characterIds.length ?
            this.characterIds[potentialNextId] : this.characterIds[0];
        this.getNewCharacterData();
    }

    ngOnChanges (changes : {[propName: string]: SimpleChange}) : void {
        if (!!changes['selectedCharacterId']) {
            this.getNewCharacterData();
        }
    }

    private getNewCharacterData () : void {
        this.characterService.getCharacterByID(this.selectedCharacterId).subscribe((character : CharacterModel) => {
            this.character = character;
        });
    }

}
