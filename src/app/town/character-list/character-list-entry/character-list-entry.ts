// Services
import {Component} from 'angular2/core';
import {Inject} from 'angular2/core';

// Style
import './character-list-entry.less';

@Component({
    inputs: ['character'],
    selector: 'character-list-entry',
    template: require('./character-list-entry.html')
})
export class CharacterListEntry {

    character : CharacterModel;

}
