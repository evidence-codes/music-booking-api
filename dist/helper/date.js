"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateFromString = convertDateFromString;
exports.parseDateToLuxonDate = parseDateToLuxonDate;
exports.isDateInPast = isDateInPast;
exports.subtractMinutesFromDate = subtractMinutesFromDate;
exports.convertToUTC = convertToUTC;
exports.getCurrentDateInUTC = getCurrentDateInUTC;
exports.getCurrentDateInTimezone = getCurrentDateInTimezone;
exports.addHoursToDate = addHoursToDate;
exports.getEndOfDay = getEndOfDay;
exports.getStartOfDay = getStartOfDay;
exports.getToday = getToday;
exports.hoursToMilliseconds = hoursToMilliseconds;
exports.isTheSameDay = isTheSameDay;
exports.isDateToday = isDateToday;
const luxon_1 = require("luxon");
function convertDateFromString(dateString) {
    return luxon_1.DateTime.fromISO(dateString).toUTC().toJSDate();
}
function parseDateToLuxonDate(date) {
    return luxon_1.DateTime.fromJSDate(date).toUTC();
}
function isDateInPast(date) {
    const currentDateUTC = luxon_1.DateTime.utc();
    return luxon_1.DateTime.fromJSDate(date) < currentDateUTC;
}
function subtractMinutesFromDate(sessionDateUTC, minutesBefore) {
    return luxon_1.DateTime.fromJSDate(sessionDateUTC)
        .minus({ minutes: minutesBefore })
        .toUTC()
        .toJSDate();
}
function convertToUTC(date) {
    return luxon_1.DateTime.fromJSDate(date).toUTC().toJSDate();
}
function getCurrentDateInUTC(timezone) {
    return luxon_1.DateTime.now().setZone(timezone).toUTC().toJSDate();
}
function getCurrentDateInTimezone(timezone) {
    return luxon_1.DateTime.now().setZone(timezone).toJSDate();
}
function addHoursToDate(date, hours) {
    return luxon_1.DateTime.fromJSDate(date).plus({ hours }).toJSDate();
}
function getEndOfDay(date, timezone) {
    return luxon_1.DateTime.fromJSDate(date).setZone(timezone).endOf('day');
}
function getStartOfDay(date, timezone) {
    return luxon_1.DateTime.fromJSDate(date).setZone(timezone).startOf('day');
}
function getToday(timezone) {
    const today = luxon_1.DateTime.now().setZone(timezone);
    const startDay = today.startOf('day').toJSDate();
    const endDay = today.endOf('day').toJSDate();
    return { startDay, endDay };
}
function hoursToMilliseconds(hours) {
    return hours * 60 * 60 * 1000;
}
function isTheSameDay(date1, date2, timezone) {
    return luxon_1.DateTime.fromJSDate(date1)
        .setZone(timezone)
        .hasSame(luxon_1.DateTime.fromJSDate(date2).setZone(timezone), 'day');
}
function isDateToday(date, timezone) {
    const currentDate = luxon_1.DateTime.now().setZone(timezone).toJSDate();
    return isTheSameDay(date, currentDate, timezone);
}
