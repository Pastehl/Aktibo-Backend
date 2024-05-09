import { Timestamp } from "firebase-admin/firestore";
import { callCalendar, getTodayMealData, getLastEntryBeforeMonday } from "../dashboardTest.js"
//getTodayMealData, getLastEntryBeforeMonday

test( 'callCalendar: check if undefined', () => {
    expect(callCalendar(undefined)).toStrictEqual([]);
})

test( 'callCalendar: check if answer is appropriate date type', () => {
    expect(callCalendar([{date: Timestamp.now()}, {date: Timestamp.now()}])).toBeInstanceOf(Array);
})

test( 'getTodayMealData: check if undefined', () => {
    expect(getTodayMealData(undefined)).toStrictEqual([0,0,0,0]);
})

test( 'getTodayMealData: check if answer is appropriate date type', () => {
    expect(getTodayMealData([{date: Timestamp.now()}, {date: Timestamp.now()}])).toBeInstanceOf(Array);
})

test( 'getLastEntryBeforeMonday: check if undefined', () => {
    expect(getLastEntryBeforeMonday(undefined)).toStrictEqual(null);
})
