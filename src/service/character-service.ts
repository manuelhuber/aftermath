import { Injectable, Inject } from 'angular2/core';
import { CharacterConnectorGoogleSpreadsheet } from '../connector/character-connector-google-spreadsheet';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { CharacterConnector } from '../model/character-connector';

@Injectable()
export class CharacterService {

    characters : Observable<CharacterModel[]>;
    achievements : Observable<AchievementModel[]>;
    detailsCache : {[id : number] : Observable<CharacterDetails>} = {};

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

    getCharacterDetails (id : number) : Observable<CharacterDetails> {

        // If it isn't cached yet, cache it!
        if (!this.detailsCache[id]) {
            this.detailsCache[id] = this.connector.getCharacterDetails(id).cache();
        }

        return this.detailsCache[id];

    }

    getAchievementsForCharacter (ids : number[]) : Observable<AchievementModel[]> {
        return this.achievements.map((achievements : AchievementModel[]) => {
            return achievements.filter((achievement : AchievementModel) =>
                ids.some((id : number) => id === achievement.id));
        });
    }
}
