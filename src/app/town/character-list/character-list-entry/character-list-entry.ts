// Services
import {Component, View} from 'angular2/core';
import {Inject} from 'angular2/core';

// Style
import './character-list-entry.less';

@Component({
    selector: 'character-list-entry'
})
@View({
    templateUrl: 'app/town/character-list/character-list-entry/character-list-entry.html'
})
export class CharacterListEntry {


    constructor () {
    }
}
