/*
 * Angular 2 decorators and services
 */
import { Component } from 'angular2/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'login',
    template: require('./login.html')
})
export class Login {

}
