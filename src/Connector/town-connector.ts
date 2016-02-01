import {Injectable} from 'angular2/core';

@Injectable()
export class TownConnector {

    town : Town;

    getTown () : Promise<Town> {
        return new Promise((resolve : any) => {
            resolve(require('./mock-data/town.json'));
        });
    }

    getTier (upgradeable : string, tier : number) : Promise<Tier> {
        let result : Tier = {
            tier : 1,
            upgradeGoldCost : 1,
            upgradeShardCost : 1,
            upgradeSizeRequirement : 1,
            description : 'test',
        };
        return new Promise((resolve : any) => {
            resolve(result);
        });
    }
}
