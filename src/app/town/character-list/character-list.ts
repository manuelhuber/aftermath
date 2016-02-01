// Services
import { Component, View, Inject } from 'angular2/core';
import { NgFor, NgIf } from 'angular2/common';
import { CharacterService } from '../../../service/character-service';

// Subcomponents
import { CharacterListEntry } from './character-list-entry/character-list-entry';

// Style
import './character-list.less';

@Component({
    selector: 'character-list',
    providers: [CharacterService],
    directives: [CharacterListEntry, NgFor],
    templateUrl: 'app/town/character-list/character-list.html'
})
export class CharacterList {

    characters : CharacterModel[];
    showList : boolean;

    constructor (@Inject(CharacterService) characterService : CharacterService) {
        characterService.getCharacters()
            .then((chars : CharacterModel[]) => { this.characters = chars; });
    }

    toggleList () : void {
        this.showList = !this.showList;
    }
}
