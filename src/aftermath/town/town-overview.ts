// Serivces
import { Component, Inject } from 'angular2/core';
import { TownService } from '../../service/town-service';


// Style
import './town-overview.less';

@Component({
    selector: 'town-overview',
    providers: [TownService],
    template: require('./town-overview.html')
})
export class TownOverview {

    town : TownModel;

    constructor (@Inject(TownService) townService : TownService) {
        townService.getTown().then((town : TownModel) => { this.town = town; });
    }
}
