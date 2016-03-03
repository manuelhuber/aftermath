import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { ItemModel } from '../model/item';

/**
 * Fetches the data from google spreadsheets
 * https://docs.google.com/spreadsheets/d/1i-i4lnApPVyM84Puxb8h7JjodZqHGasAWiN1u2Lxs5g/edit#gid=0
 * The URL to get the JSON from a google spreasheet is:
 * https://spreadsheets.google.com/feeds/list/{{key}}/{{worksheetID}}/public/values?alt=json
 * You can find the key when publishing the spreadsheet, but fo the worksheet ID go to
 * https://spreadsheets.google.com/feeds/worksheets/{{key}}/private/full
 * And search for the link
 */

const BASE_URL : string = 'https://spreadsheets.google.com/feeds/list';
const SPREADSHEET_KEY : string = '1i-i4lnApPVyM84Puxb8h7JjodZqHGasAWiN1u2Lxs5g';
const CHARACTER_WORKSHEET_ID : string = 'od6';
const ITEM_WORKSHEET_ID : string = 'ogun2ej';
const ACHIEVEMENT_WORKSHEET_ID : string = 'orwrc8q';
const OPTIONS : string = 'public/values?alt=json'

@Injectable()
export class CharacterConnectorGoogleSpreadsheet {

    constructor (private http : Http) {}

    getCharacters () : Observable<CharacterModel[]> {
        return this.http.get(`${BASE_URL}/${SPREADSHEET_KEY}/${CHARACTER_WORKSHEET_ID}/${OPTIONS}`)
            .map(response => response.json().feed.entry)
            .map((response : any[]) => {
                let result : CharacterModel[] = [];
                response.forEach((row : any) => {
                    let char : CharacterModel = {
                        id: JSON.parse(row.gsx$id.$t),
                        name: row.gsx$name.$t,
                        image: row.gsx$image.$t,
                        experience: JSON.parse(row.gsx$xp.$t),
                        description: row.gsx$description.$t,
                        achievements: this.parseNumbersStringToArray(row.gsx$achievements.$t),
                        items: this.parseNumbersStringToArray(row.gsx$items.$t)
                    };
                    result.push(char);
                });
                return result;
            });
    }

    getAchievements () : Observable<AchievementModel[]> {
        return this.http.get(`${BASE_URL}/${SPREADSHEET_KEY}/${ACHIEVEMENT_WORKSHEET_ID}/${OPTIONS}`)
            .map(response => response.json().feed.entry)
            .map((response : any[]) => {
                let result : AchievementModel[] = [];
                response.forEach((row : any) => {
                    let item : AchievementModel = {
                        id: JSON.parse(row.gsx$id.$t),
                        description: row.gsx$description.$t,
                        image: row.gsx$image.$t,
                        name: row.gsx$name.$t,
                        date: new Date(row.gsx$date.$t),
                        rarity: JSON.parse(row.gsx$rarity.$t)
                    };
                    result.push(item);
                });
                return result;
            });
    }

    getItems () : Observable<ItemModel[]> {
        return this.http.get(`${BASE_URL}/${SPREADSHEET_KEY}/${ITEM_WORKSHEET_ID}/${OPTIONS}`)
            .map(response => response.json().feed.entry)
            .map((response : any[]) => {
                let result : ItemModel[] = [];
                response.forEach((row : any) => {
                    let item : ItemModel = {
                        id: JSON.parse(row.gsx$id.$t),
                        type: row.gsx$type.$t,
                        description: row.gsx$description.$t,
                        image: row.gsx$image.$t,
                        name: row.gsx$name.$t,
                        date: new Date(row.gsx$date.$t),
                        rarity: JSON.parse(row.gsx$rarity.$t)
                    };
                    result.push(item);
                });
                return result;
            });
    }

    parseNumbersStringToArray (string : String) : number[] {
        let stringArray : string[] = string.split(',');
        let numberArray : number[] = [];
        try {
            stringArray.forEach((entry : String) => {
                if (!isNaN(+entry)) {
                    numberArray.push(+entry);
                }
            });
        } catch (e) {
            console.log(e);
        } finally {
            return numberArray;
        }
    }
}
