import { Injectable } from 'angular2/core';

/**
 * Just a mock implementation.
 */
@Injectable()
export class ContentConnector {

    systemContent : Article;

    constructor () {
        this.systemContent = require('../data/content/system-content.json');
    }

    getSystemContent () : Promise<Article> {
        return new Promise((resolve : any) => { resolve(this.systemContent); });
    }

}
