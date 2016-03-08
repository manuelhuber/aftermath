import {CharacterDetailsModel} from '../model/character-details';
import {ItemModel} from '../model/item';

export function applyFrontSheetToCharacter (json : any, character : CharacterDetailsModel) : void {
    let sheet : string[][] = jsonToArray(json);

    character.name = sheet[6][8];
    character.about = sheet[12][4];
    character.role = sheet[9][8];
    character.story = sheet[73][2];
    character.age = sheet[7][30];
    character.look = sheet[8][26];
    character.build = sheet[7][35];
    character.quirks = sheet[9][26];
    character.superstition = sheet[10][26];

    character.weaponSkill = JSON.parse(sheet[19][9]);
    character.ballisticSkill = JSON.parse(sheet[21][9]);
    character.strength = JSON.parse(sheet[23][9]);
    character.toughness = JSON.parse(sheet[25][9]);
    character.agility = JSON.parse(sheet[27][9]);

    character.intelligence = JSON.parse(sheet[19][19]);
    character.perception = JSON.parse(sheet[21][19]);
    character.willpower = JSON.parse(sheet[23][19]);
    character.fellowship = JSON.parse(sheet[25][19]);
    character.influence = JSON.parse(sheet[27][19]);

}

export function applyBackSheetToCharacter (json : any, character : CharacterDetailsModel) : void {
    let sheet : string[][] = jsonToArray(json);
    applyItems(sheet, character);
    return null;
}

function applyItems (sheet : string[][], character : CharacterDetailsModel) : void {

    let row : number = 43;
    let itemName : string = sheet[row][2];

    character.items = [];

    while (!!itemName) {

        // Building the date
        let dateArray : string[] = sheet[row][17].split('.');
        let date : Date = new Date();
        date.setFullYear(parseInt(dateArray[2], 10));
        // Months start at 0
        date.setMonth(parseInt(dateArray[1], 10) - 1);
        date.setDate(parseInt(dateArray[0], 10));

        let item : ItemModel = {
            name: itemName,
            description: sheet[row][6],
            type: sheet[row][15],
            date: date,
            image: sheet[row][19],
            rarity: JSON.parse(sheet[row][20])
        };
        character.items.push(item);
        itemName = sheet[++row][2];
    }
}
/**
 * Transforms the json to a 2 dimensional array
 */
function jsonToArray (json : any) : string[][] {
    let result : string[][] = [];

    // Initiliaze array with empty values
    let colCount : number = JSON.parse(json.feed.gs$colCount.$t);
    let rowCount : number = JSON.parse(json.feed.gs$rowCount.$t);
    for (let i : number = 0; i < rowCount; i++) {
        result[i] = [];
        for (let j : number = 0; j < colCount; j++) {
            result[i][j] = '';
        }
    }

    // Fill in all the data
    json.feed.entry.forEach((entry : any) => {
        if (entry) {
            result[JSON.parse(entry.gs$cell.row)][JSON.parse(entry.gs$cell.col)] = entry.gs$cell.$t;
        }
    });
    return result;
}
