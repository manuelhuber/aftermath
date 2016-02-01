import {Injectable} from 'angular2/core';

/**
 * Just a mock implementation.
 * Will later do all of the http REST calls for anything Town related
 */
@Injectable()
export class CharacterConnector {

    characters : CharacterModel[];
    items : ItemModel[];
    achievements : AchievementModel[];

    constructor () {
        this.characters = require('./mock-data/characters.json');
        this.achievements = require('./mock-data/achievements.json');
        this.items = require('./mock-data/items.json');
    }

    getCharacters () : Promise<CharacterModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.characters);
        });
    }

    getAchievements () : Promise<ItemModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.achievements);
        });
    }

    getItems () : Promise<AchievementModel[]> {
        return new Promise((resolve : any) => {
            resolve(this.items);
        });
    }
}
