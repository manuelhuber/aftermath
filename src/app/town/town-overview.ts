/*
 * Angular 2 decorators and services
 */
import {Component, View} from 'angular2/core';
import { TownService } from '../../service/town-service';
import {Inject} from 'angular2/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'TownOverview',
    providers: [TownService]
})
@View({
    templateUrl: 'app/town/town-overview.html'
})
export class TownOverview {

    town : TownModel;

    constructor (@Inject(TownService) townService : TownService) {
        townService.getTown().then((town : TownModel) => { this.town = town; });
    }
}
