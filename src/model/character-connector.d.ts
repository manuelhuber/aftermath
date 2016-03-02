import { Observable } from 'rxjs/Rx';
import {AchievementModel} from './achievement';
import {ItemModel} from './item';

export interface CharacterConnector {
    getCharacters : () => Observable<CharacterModel[]>;
    getAchievements : () => Observable<AchievementModel[]>;
    getItems : () => Observable<ItemModel[]>;
}
