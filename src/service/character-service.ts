import { Injectable, Inject } from 'angular2/core';
import { CharacterConnectorGoogleSpreadsheet } from '../connector/character-connector-google-spreadsheet';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { ItemModel } from '../model/item';
import {CharacterConnector} from '../model/character-connector';

@Injectable()
export class CharacterService {

    characters : Observable<CharacterModel[]>;
    items : Observable<ItemModel[]>;
    achievements : Observable<AchievementModel[]>;

    constructor (@Inject(CharacterConnectorGoogleSpreadsheet) private connector : CharacterConnector) {
        this.characters = connector.getCharacters().cache();
        this.items = connector.getItems();
        this.achievements = connector.getAchievements();
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

    getAchievementsForCharacter (character : CharacterModel) : Observable<AchievementModel[]> {
        return this.achievements.map((achievements : AchievementModel[]) => {
            return achievements.filter((achievement : AchievementModel) =>
                character.achievements.some((id : number) => id === achievement.id));
        });
    }

    getItemsForCharacter (character : CharacterModel) : Observable<ItemModel[]> {
        return this.achievements.map((items : ItemModel[]) => {
            return items.filter((item : ItemModel) =>
                character.achievements.some((id : number) => id === item.id));
        });
    }
}
