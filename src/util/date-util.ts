/**
 * Returns the date in the format dd.mm.yyyy without zero-padding (1.2.1234 instead of 01.02.1234)
 * @param date
 * @returns {string}
 */
export function dateToString (date : Date) : string {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('.');
}
