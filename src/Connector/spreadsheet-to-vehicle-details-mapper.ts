import { spreadsheetJsonToArray, getNumber, getDate } from './spreadsheet-mapper-helper';

export function applySheetToVehicle (json : any, vehicle : VehicleDetails) {
    let sheet : string[][] = spreadsheetJsonToArray(json);

    vehicle.name = sheet[3][2];
    vehicle.type = sheet[3][8];
    vehicle.front = getNumber(sheet[5][4]);
    vehicle.side = getNumber(sheet[5][7]);
    vehicle.rear = getNumber(sheet[5][10]);
    vehicle.cruisingSpeed = getNumber(sheet[7][4]);
    vehicle.tacticalSpeed = getNumber(sheet[7][7]);
    vehicle.manoeuvrability = getNumber(sheet[7][10]);
    vehicle.carryingCapacity = getNumber(sheet[8][4]);
    vehicle.integrity = getNumber(sheet[8][7]);
    vehicle.size = sheet[8][10];

    let weaponRow = 15;
    while (sheet[weaponRow][2]) {
        applyWeapon(weaponRow, sheet, vehicle);
        weaponRow += 10;
    }
}

function applyWeapon (baseRow : number, sheet : string[][], vehicle : VehicleDetails) {
    vehicle.weapons.push({
        name: sheet[baseRow][2],
        type: sheet[baseRow][8],
        date: getDate(sheet[baseRow + 3][10]),
        rarity: getNumber(sheet[baseRow + 2][10]),
        description: sheet[baseRow + 2][3],
        image: sheet[baseRow + 4][10]
    })
}
