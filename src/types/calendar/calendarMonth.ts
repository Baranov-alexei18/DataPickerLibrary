import { CalendarDay } from './calendarDay';

export type CalendarMonth = {
    getDay: (day: number) => CalendarDay,
    monthName: string,
    monthIndex: number,
    monthNumber: number,
    year: number,
    createMonthDays: ()=>CalendarDay[],
}
