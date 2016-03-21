/**
 * Transforms the json to a 2 dimensional array that corresponds to the actual google spreadsheet
 * Multi-row/column cells are addressed by the coordinates of the top left corner cell
 */
export function spreadsheetJsonToArray (json : any) : string[][] {
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

/**
 * Returns the number in the cell or 0 if the cell is empty
 */
export function getNumber (cell : string) : number {
    return cell.length ? JSON.parse(cell) : 0;
}

/**
 * Writing this is faster than looking for an existing library/function
 * @param cell
 * @returns {Date}
 */
export function getDate (cell : string) : Date {
    let year : number;
    // Months start at 0
    let month : number;
    let day : number;

    if (cell.indexOf('.') !== -1) {
        // European format, dd.mm.yyyy
        let dateArray : string[] = cell.split('.');
        year = parseInt(dateArray[2], 10);
        month = parseInt(dateArray[1], 10) - 1;
        day = parseInt(dateArray[0], 10);

    } else if (cell.indexOf('/') !== -1) {
        // American format, mm.dd.yyyy
        let dateArray : string[] = cell.split('/');
        year = parseInt(dateArray[2], 10);
        month = parseInt(dateArray[0], 10) - 1;
        day = parseInt(dateArray[1], 10);
    } else {
        return new Date();
    }
    let date : Date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    return date;
}
