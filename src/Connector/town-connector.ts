import {Injectable} from 'angular2/core';

/**
 * Just a mock implementation.
 * Will later do all of the http REST calls for anything Town related
 */
@Injectable()
export class TownConnector {

    town : TownModel;
    tiers : TierModel[];

    constructor () {
        this.town = require('./mock-data/town.json');
        this.tiers = require('./mock-data/tiers.json');
    }

    getTown () : Promise<TownModel> {
        return new Promise((resolve : any) => {
            resolve(this.town);
        });
    }

    upgradeGnarfHQ (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeTaverne (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeFarm (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeTownGuard (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeHospital (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeTradingPost (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeShrine (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeLibrary (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeStables (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeBarracks (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeAlchemist (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    upgradeBlacksmith (characterId : number) : Promise<any> {
        return new Promise((resolve : any) => { resolve(); });
    }

    getGnarfHQTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getTaverneTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getFarmTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getTownGuardTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getHospitalTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getTradingPostTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getShrineTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getLibraryTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getStablesTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getBarracksTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getAlchemistTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

    getBlacksmithTiers () : Promise<TierModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.tiers);
        });
    }

}
