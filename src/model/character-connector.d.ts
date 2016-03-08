import { Observable } from 'rxjs/Rx';
import { AchievementModel } from './achievement';

export interface CharacterConnector {
    getCharacters : () => Observable<CharacterModel[]>;
    getAchievements : () => Observable<AchievementModel[]>;
    getCharacterDetails : (id : number) => Observable<CharacterDetails>;
}


