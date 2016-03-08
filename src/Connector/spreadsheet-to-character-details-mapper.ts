const NO_TALENT_NAME = 'None';

export function applyFrontSheetToCharacter (json : any, character : CharacterDetails) : void {
    let sheet : string[][] = jsonToArray(json);

    // General stuff left side (on the character sheet)
    character.name = sheet[6][8];
    character.homeWorld = sheet[7][8];
    character.background = sheet[8][8];
    character.role = sheet[9][8];
    character.eliteAdvances = sheet[10][8];
    character.divination = sheet[11][8];
    character.about = sheet[12][4];

    // General stuff right side (on the character sheet)
    character.gender = sheet[7][26];
    character.age = sheet[7][30];
    character.build = sheet[7][35];
    character.complexion = sheet[8][26];
    character.quirks = sheet[9][26];
    character.superstition = sheet[10][26];
    character.momentos = sheet[11][26];
    character.allies = sheet[12][26];
    character.enemies = sheet[13][26];

    character.story = sheet[73][2];

    // XP
    character.experienceEarned = JSON.parse(sheet[32][17]);
    character.characteristicExperience = JSON.parse(sheet[33][17]);
    character.skillExperience = JSON.parse(sheet[34][17]);
    character.talentExperience = JSON.parse(sheet[35][17]);
    character.psykerExperience = JSON.parse(sheet[36][17]);
    character.experienceAvailable = JSON.parse(sheet[38][17]);

    //characteristics
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

    applyTalents(sheet, character);
    applySkills(sheet, character);

}

export function applyBackSheetToCharacter (json : any, character : CharacterDetails) : void {
    let sheet : string[][] = jsonToArray(json);
    applyItems(sheet, character);
    return null;
}

function applyItems (sheet : string[][], character : CharacterDetails) : void {

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

        let item : Item = {
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

function applyTalents (sheet : string[][], character : CharacterDetails) {
    let talents : Talent[] = [];
    for (let row : number = 55; row < 70; row++) {
        let talentName : string = sheet[row][2];
        if (talentName !== NO_TALENT_NAME) {
            talents.push({
                name: talentName,
                description: sheet[row][10]
            });
        }
    }
    character.talents = talents;
}

function applySkills (sheet : string[][], character : CharacterDetails) {

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
