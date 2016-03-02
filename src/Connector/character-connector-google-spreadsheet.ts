import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { ItemModel } from '../model/item';

/**
 * Fetches the data from google spreadsheets
 * The URL to get the JSON from a google spreasheet is:
 * https://spreadsheets.google.com/feeds/list/{{key}}/{{worksheetID}}/public/values?alt=json
 * You can find the key when publishing the spreadsheet, but fo the worksheet ID go to
 * https://spreadsheets.google.com/feeds/worksheets/{{key}}/private/full
 * And search for the link
 */

const BASE_URL : string = 'https://spreadsheets.google.com/feeds/list/';
const SPREADSHEET_KEY : string = '1i-i4lnApPVyM84Puxb8h7JjodZqHGasAWiN1u2Lxs5g';
const CHARACTER_WORKSHEET_ID : string = 'od6';

@Injectable()
export class CharacterConnectorGoogleSpreadsheet {

    constructor (private http : Http) {}

    getCharacters () : Observable<CharacterModel[]> {
        return this.http.get(`${BASE_URL}${SPREADSHEET_KEY}/${CHARACTER_WORKSHEET_ID}/public/values?alt=json`)
            .map(response => response.json().feed.entry)
            .map((response : any[]) => {
                let result : CharacterModel[] = [];
                response.forEach((row : any) => {
                    let char : CharacterModel = {
                        id: JSON.parse(row.gsx$id.$t),
                        name: row.gsx$name.$t,
                        image: row.gsx$image.$t,
                        experience: JSON.parse(row.gsx$experience.$t),
                        description: row.gsx$description.$t,
                        achievements: JSON.parse(row.gsx$achievements.$t),
                        items: JSON.parse(row.gsx$items.$t)
                    };
                    result.push(char);
                });
                return result;
            });
    }

    getAchievements () : Observable<AchievementModel[]> {
        return this.http.get('data/characters/achievements.json')
            .map(res => res.json());
    }

    getItems () : Observable<ItemModel[]> {
        return this.http.get('data/characters/items.json')
            .map(res => res.json());
    }
}
