// Services
import { Component, Input } from 'angular2/core';

// Sub components
import { NgFor, NgIf } from 'angular2/common';

// Style
import './character-details-stats.less';

@Component({
    selector: 'character-details-stats',
    directives: [NgFor, NgIf],
    template: require('./character-details-stats.html')
})
export class CharacterDetailsStats  {

    @Input() details : CharacterDetails;

}
