import { Injectable } from 'angular2/core';
import { CharacterConnector } from '../connector/character-connector';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';

@Injectable()
export class CharacterService {

    characters : Observable<CharacterModel[]>;

    constructor (private connector : CharacterConnector) {
        this.characters = connector.getCharacters();
    }

    getCharacters () : Observable<CharacterModel[]> {
        return this.characters;
    }

    getCharacterByID (id : number) : Observable<CharacterModel> {
        return this.characters.map((characters : CharacterModel[]) => {

            // Filter the array for the character with the ID. If there is none, we return undefined
            return characters.reduce((prev : CharacterModel, curr : CharacterModel) => {
                return prev ? prev : curr.id === id ? curr : undefined;
            }, undefined);

        });
    }

    getAchievements () : Promise<ItemModel[]> {
        return this.connector.getAchievements();
    }

    getItems () : Promise<AchievementModel[]> {
        return this.connector.getItems();
    }
}
