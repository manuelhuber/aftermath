// Services
import { Component, Input } from 'angular2/core';

// Sub components
import { NgFor, NgIf } from 'angular2/common';

@Component({
    selector: 'character-details-personality',
    directives: [NgFor, NgIf],
    template: require('./character-details-personality.html')
})
export class CharacterDetailsPersonality {

    @Input() details : CharacterDetails;

}
