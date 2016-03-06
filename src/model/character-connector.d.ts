import { Observable } from 'rxjs/Rx';
import { AchievementModel } from './achievement';
import { ItemModel } from './item';
import { CharacterDetailsModel } from './character-details';

export interface CharacterConnector {
    getCharacters : () => Observable<CharacterModel[]>;
    getAchievements : () => Observable<AchievementModel[]>;
    getCharacterDetails : (id : number) => Observable<CharacterDetailsModel>;
}
