/*
 * Angular 2 decorators and services
 */
import {Component, View} from 'angular2/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'login',
})
@View({
    templateUrl : 'app/login/login.html'
})
export class Login {

}
