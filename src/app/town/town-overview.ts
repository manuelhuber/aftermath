// Serivces
import { Component, View, Inject } from 'angular2/core';
import { TownService } from '../../service/town-service';

// Subcomponents
import { CharacterList } from './character-list/character-list';

// Style
import './town-overview.less';

@Component({
    selector: 'town-overview',
    providers: [TownService],
    directives: [CharacterList],
    templateUrl: 'app/town/town-overview.html'
})
export class TownOverview {

    town : TownModel;

    constructor (@Inject(TownService) townService : TownService) {
        townService.getTown().then((town : TownModel) => { this.town = town; });
    }
}
