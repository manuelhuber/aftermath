import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';

/**
 * Gets all the data from the jsons laying on the server
 */
@Injectable()
export class CharacterConnectorJsonFiles {

    constructor (private http : Http) { }

    getCharacters () : Observable<CharacterModel[]> {
        return this.http.get('data/characters/characters.json')
            .map(res => res.json());
    }

    getAchievements () : Observable<AchievementModel[]> {
        return this.http.get('data/characters/achievements.json')
            .map(res => res.json());
    }

    getItems () : Observable<Item[]> {
        return this.http.get('data/characters/items.json')
            .map(res => res.json());
    }
}
