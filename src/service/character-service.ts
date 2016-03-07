import { Injectable, Inject } from 'angular2/core';
import { CharacterConnectorGoogleSpreadsheet } from '../connector/character-connector-google-spreadsheet';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { ItemModel } from '../model/item';
import {CharacterConnector} from '../model/character-connector';
import {CharacterDetailsModel} from '../model/character-details';

@Injectable()
export class CharacterService {

    characters : Observable<CharacterModel[]>;
    achievements : Observable<AchievementModel[]>;

    constructor (@Inject(CharacterConnectorGoogleSpreadsheet) private connector : CharacterConnector) {
        this.characters = connector.getCharacters().cache();
        this.achievements = connector.getAchievements().cache();
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

    getCharacterDetails (id : number) : Observable<CharacterDetailsModel> {
        return this.connector.getCharacterDetails(id);
    }

    getAchievementsForCharacter (ids : number[]) : Observable<AchievementModel[]> {
        return this.achievements.map((achievements : AchievementModel[]) => {
            return achievements.filter((achievement : AchievementModel) =>
                ids.some((id : number) => id === achievement.id));
        });
    }
}
