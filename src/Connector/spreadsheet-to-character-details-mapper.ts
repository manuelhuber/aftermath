import {CharacterDetailsModel} from '../model/character-details';

export function applyFrontSheetToCharacter (json : any, character : CharacterDetailsModel) : CharacterDetailsModel {
    let sheet : string[][] = jsonToArray(json);

    character.name = sheet[6][8];
    character.about = sheet[12][4];
    character.role = sheet[9][8];

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

    console.log(character);
    return character;
}

export function applyBackSheetToCharacter (json : any, character : CharacterDetailsModel) : CharacterDetailsModel {
    return null;
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
