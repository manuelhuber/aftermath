declare interface CharacterSpreadsheets {
    entry ?: {(id : number) : SpreadsheetKeys};
}

export interface SpreadsheetKeys {
    characterName : string;
    spreadsheetKey : string;
    frontWorksheetKey ?: string;
    backWorksheetKey ?: string;
    characterDetailsWorksheetKey ?: string;
    vehicleDetailsWorksheetKey ?: string;
}
