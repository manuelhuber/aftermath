/*
 * Angular 2 decorators and services
 */
import { Component } from 'angular2/core';

import './header.less';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'header',
    template: require('./header.html')
})
export class Header {

}
