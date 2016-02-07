// Services
import { Component, Input, EventEmitter, Output } from 'angular2/core';
import { NgIf } from 'angular2/common';

// Style
import './character-details.less';

@Component({
    selector: 'character-details',
    template: require('./character-details.html')
})
export class CharacterDetails {

    @Input() active : boolean = true;
    @Input() selectedCharacterId : number;
    @Input() characterIds : number[];

    // Needed for two way binding
    @Output() activeChange : EventEmitter<boolean> = new EventEmitter();

    close (event : Event) : void {
        this.active = false;
        this.activeChange.emit(false);
    }

}
