import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';

/**
 * Just a mock implementation.
 */
@Injectable()
export class CharacterConnector {

    characters : CharacterModel[];
    charactersObservable : Observable<CharacterModel[]>;
    items : ItemModel[];
    achievements : AchievementModel[];

    constructor (private http : Http) {
        this.achievements = require('./mock-data/achievements.json');
        this.items = require('./mock-data/items.json');
    }

    getCharacters () : Observable<CharacterModel[]> {
        return this.http.get('data/characters/characters.json')
            .map(res => res.json());
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
