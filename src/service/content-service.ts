import { Injectable } from 'angular2/core';
import { ContentConnector } from '../connector/content-connector';

@Injectable()
export class CharacterService {

    constructor (private connector : ContentConnector) {}

    getSystemContent () : Promise<Article> {
        return this.connector.getSystemContent();
    }

}
