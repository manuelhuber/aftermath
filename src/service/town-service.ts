import { Injectable } from 'angular2/core';
import { TownConnector } from '../connector/town-connector';

@Injectable()
export class TownService {

    constructor (private connector : TownConnector) {}

    getTown () : Promise<TownModel> {
        return this.connector.getTown();
    }

    upgradeGnarfHQ (characterId : number) : Promise<any> {
        return this.connector.upgradeGnarfHQ(characterId);
    }

    upgradeTaverne (characterId : number) : Promise<any> {
        return this.connector.upgradeTaverne(characterId);
    }

    upgradeFarm (characterId : number) : Promise<any> {
        return this.connector.upgradeFarm(characterId);
    }

    upgradeTownGuard (characterId : number) : Promise<any> {
        return this.connector.upgradeTownGuard(characterId);
    }

    upgradeHospital (characterId : number) : Promise<any> {
        return this.connector.upgradeHospital(characterId);
    }

    upgradeTradingPost (characterId : number) : Promise<any> {
        return this.connector.upgradeTradingPost(characterId);
    }

    upgradeShrine (characterId : number) : Promise<any> {
        return this.connector.upgradeShrine(characterId);
    }

    upgradeLibrary (characterId : number) : Promise<any> {
        return this.connector.upgradeLibrary(characterId);
    }

    upgradeStables (characterId : number) : Promise<any> {
        return this.connector.upgradeStables(characterId);
    }

    upgradeBarracks (characterId : number) : Promise<any> {
        return this.connector.upgradeBarracks(characterId);
    }

    upgradeAlchemist (characterId : number) : Promise<any> {
        return this.connector.upgradeAlchemist(characterId);
    }

    upgradeBlacksmith (characterId : number) : Promise<any> {
        return this.connector.upgradeBlacksmith(characterId);
    }

    getGnarfHQTiers () : Promise<TierModel[]> {
        return this.connector.getGnarfHQTiers();
    }

    getTaverneTiers () : Promise<TierModel[]> {
        return this.connector.getTaverneTiers();
    }

    getFarmTiers () : Promise<TierModel[]> {
        return this.connector.getFarmTiers();
    }

    getTownGuardTiers () : Promise<TierModel[]> {
        return this.connector.getTownGuardTiers();
    }

    getHospitalTiers () : Promise<TierModel[]> {
        return this.connector.getHospitalTiers();
    }

    getTradingPostTier () : Promise<TierModel[]> {
        return this.connector.getTradingPostTiers();
    }

    getShrineTiers () : Promise<TierModel[]> {
        return this.connector.getShrineTiers();
    }

    getLibraryTiers () : Promise<TierModel[]> {
        return this.connector.getLibraryTiers();
    }

    getStablesTiers () : Promise<TierModel[]> {
        return this.connector.getStablesTiers();
    }

    getBarracksTiers () : Promise<TierModel[]> {
        return this.connector.getBarracksTiers();
    }

    getAlchemistTiers () : Promise<TierModel[]> {
        return this.connector.getAlchemistTiers();
    }

    getBlacksmithTiers () : Promise<TierModel[]> {
        return this.connector.getBlacksmithTiers();
    }

}
