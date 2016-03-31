import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { AchievementModel } from '../model/achievement';
import { CharacterSpreadsheets, SpreadsheetKeys } from '../model/spreadsheet-keys';
import { applyFrontSheetToCharacter, applyBackSheetToCharacter,
    applyCharacterDetailsSheetToCharacter } from './spreadsheet-to-character-details-mapper';
import { CharacterConnector } from '../model/character-connector';

/**
 * Fetches the data from google spreadsheets
 * https://docs.google.com/spreadsheets/d/1i-i4lnApPVyM84Puxb8h7JjodZqHGasAWiN1u2Lxs5g/edit#gid=0
 * The URL to get the JSON from a google spreasheet is:
 * https://spreadsheets.google.com/feeds/list/{{key}}/{{worksheetID}}/public/values?alt=json
 * You can find the key when publishing the spreadsheet, but fo the worksheet ID go to
 * https://spreadsheets.google.com/feeds/worksheets/{{key}}/private/full
 * And search for the link
 */

const BASE_URL : string = 'https://spreadsheets.google.com/feeds';
const LIST : string = 'list';
const CELLS : string = 'cells';

const SPREADSHEET_KEY : string = '1i-i4lnApPVyM84Puxb8h7JjodZqHGasAWiN1u2Lxs5g';
const CHARACTER_WORKSHEET_ID : string = 'od6';
const ACHIEVEMENT_WORKSHEET_ID : string = 'orwrc8q';
const OPTIONS : string = 'public/values?alt=json';

const PUB_URL_PRE = 'https://docs.google.com/spreadsheets/d';
const PUB_URL_POST = 'pubhtml';

@Injectable()
export class CharacterConnectorGoogleSpreadsheet implements CharacterConnector {

    characters : CharacterSpreadsheets;

    constructor (private http : Http) {}

    /**
     * Gets the all the CharacterModels and also internally saves the spreadsheet keys
     * @returns {Observable<R>}
     */
    getCharacters () : Observable<CharacterModel[]> {

        let baseCall : Observable<any> =
            this.http.get(`${BASE_URL}/${LIST}/${SPREADSHEET_KEY}/${CHARACTER_WORKSHEET_ID}/${OPTIONS}`);

        // Get the spreasheet keys
        baseCall.map(response => response.json().feed.entry).subscribe((response : any[]) => {

            let result : CharacterSpreadsheets = {};
            response.forEach((row : any) => {
                // Save all the keys
                let entry : SpreadsheetKeys = {
                    characterName: row.gsx$name.$t,
                    spreadsheetKey: row.gsx$key.$t,
                    frontWorksheetKey: row.gsx$front.$t,
                    backWorksheetKey: row.gsx$back.$t,
                    characterDetailsWorksheetKey: row.gsx$characterdetails.$t,
                    vehicleDetailsWorksheetKey: row.gsx$vehicledetails.$t
                };
                result[JSON.parse(row.gsx$id.$t)] = entry;
            });

            this.characters = result;
        });

        // Return the CharacterModels
        return baseCall.map(response => response.json().feed.entry).map((response : any[]) => {

            let result : CharacterModel[] = [];
            response.forEach((row : any) => {
                // Actual CharacterModel
                let char : CharacterModel = {
                    id: JSON.parse(row.gsx$id.$t),
                    name: row.gsx$name.$t,
                    image: row.gsx$image.$t,
                    achievementScore: row.gsx$score.$t,
                    url: [PUB_URL_PRE, row.gsx$key.$t, PUB_URL_POST].join('/')
                };
                result.push(char);
            });

            return result;
        });
    }

    /**
     * Returns all the Character details from the spreadsheet for the given ID
     * If no spreadsheet is given, it will return null
     */
    getDetails (id : number) : Observable<CharacterDetails | VehicleDetails> {

        let keys : SpreadsheetKeys = this.characters[id];

        if (!keys) {
            return null;
        }

        let frontUrl : string = `${BASE_URL}/${CELLS}/${keys.spreadsheetKey}/${keys.frontWorksheetKey}/${OPTIONS}`;
        let backUrl : string = `${BASE_URL}/${CELLS}/${keys.spreadsheetKey}/${keys.backWorksheetKey}/${OPTIONS}`;
        let characterDetailsUrl : string =
            `${BASE_URL}/${CELLS}/${keys.spreadsheetKey}/${keys.characterDetailsWorksheetKey}/${OPTIONS}`;

        return Observable.forkJoin(
            this.http.get(frontUrl).map(response => response.json()),
            this.http.get(backUrl).map(response => response.json()),
            this.http.get(characterDetailsUrl).map(response => response.json()))

            .map((response : any[]) => {

                let character : CharacterDetails = this.getEmptyCharacterDetails();

                applyFrontSheetToCharacter(response[0], character);
                applyBackSheetToCharacter(response[1], character);
                applyCharacterDetailsSheetToCharacter(response[2], character);

                return character;
            });
    }

    /**
     * Returns all achievements from the Google Spreadsheet
     * @returns {Observable<R>}
     */
    getAchievements () : Observable<AchievementModel[]> {
        return this.http.get(`${BASE_URL}/${LIST}/${SPREADSHEET_KEY}/${ACHIEVEMENT_WORKSHEET_ID}/${OPTIONS}`)
            .map(response => response.json().feed.entry)
            .map((response : any[]) => {
                let result : AchievementModel[] = [];
                response.forEach((row : any) => {
                    let achievement : AchievementModel = {
                        id: JSON.parse(row.gsx$id.$t),
                        description: row.gsx$description.$t,
                        image: row.gsx$image.$t,
                        name: row.gsx$name.$t,
                        date: new Date(row.gsx$date.$t),
                        rarity: JSON.parse(row.gsx$rarity.$t),
                        earnedBy: this.checkAchievementEarned(row)
                    };
                    result.push(achievement);
                });
                return result;
            });
    }

    parseStringToNumberArray (string : String) : number[] {
        let stringArray : string[] = string.split(',');
        let numberArray : number[] = [];
        try {
            stringArray.forEach((entry : String) => {
                if (!isNaN(+entry) && +entry !== 0) {
                    numberArray.push(+entry);
                }
            });
        } finally {
            return numberArray;
        }
    }

    private checkAchievementEarned (row : any) : number[] {
        let ids : number[] = [];
        for (let id in this.characters) {
            if (this.characters.hasOwnProperty(id)
                && row.hasOwnProperty('gsx$' + this.characters[id].characterName.toLowerCase())
                && row['gsx$' + this.characters[id].characterName.toLowerCase()].$t !== '') {
                try {
                    ids.push(parseInt(id, 10));
                } finally {
                    // tslint is being a bitch
                }
            }
        }
        return ids;
    }

    private getEmptyCharacterDetails () : CharacterDetails {
        return {
            // General stuff left side (on the character sheet)
            name: '',
            homeWorld: '',
            background: '',
            role: '',
            eliteAdvances: '',
            divination: '',
            about: '',

            // General stuff right side (on the character sheet)
            gender: '',
            age: '',
            build: '',
            complexion: '',
            quirks: '',
            superstition: '',
            momentos: '',
            allies: '',
            enemies: '',

            story: '',

            aptitudes: [],

            insanity: 0,
            mentalDisorders: [],
            corruption: 0,
            malignancies: [],
            mutations: [],

            // XP
            experienceEarned: 0,
            characteristicExperience: 0,
            skillExperience: 0,
            talentExperience: 0,
            psykerExperience: 0,
            experienceAvailable: 0,

            // Characteristics
            characteristics: {
                weaponSkill: 0,
                ballisticSkill: 0,
                strength: 0,
                toughness: 0,
                agility: 0,
                intelligence: 0,
                perception: 0,
                willpower: 0,
                fellowship: 0,
                influence: 0
            },

            skills: [],

            homeworldBonus: '',
            backgroundBonus: '',
            roleBonus: '',

            talents: [],

            fatePoints: 0,
            wounds: 0,

            items: [],

            sins: {
                gluttony: 0,
                greed: 0,
                sloth: 0,
                envy: 0,
                wrath: 0,
                pride: 0,
                lust: 0
            },

            personality: [],

            relationships: []
        };
    }
}
