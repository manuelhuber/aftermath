import { Injectable } from 'angular2/core';
import { TownConnector } from '../connector/town-connector';

@Injectable()
export class TownService {

    town : Promise<TownModel>;

    constructor (connector : TownConnector) {
        this.town = connector.getTown();
    }

    getTown () : Promise<TownModel> {
        return this.town;
    }

}
