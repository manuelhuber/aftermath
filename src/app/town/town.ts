/*
 * Angular 2 decorators and services
 */
import {Component, View} from 'angular2/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'town',
})
@View({
    templateUrl : 'app/town/town.html'
})
export class Town {

}
