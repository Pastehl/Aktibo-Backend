import { callCalendar, getTodayMealData, getLastEntryBeforeMonday } from "../dashboard.js"

test( 'checkActiveLast3Months: check if undefined', () => {
    expect(callCalendar(undefined)).toBe([]);
})