import { CalendarDay } from './calendarDay';

export type ModeCalendar = 'days' | 'monthes' | 'years'

export type CalendarStateType = {
    mode: ModeCalendar,
    calendarDays: CalendarDay[],
    weekDaysNames:{
        day: string;
        dayShort: string;
    }[],
    monthesNames: {
        month: string;
        monthShort: string;
        monthIndex: number;
        date: Date;
    }[],
    selectedDay: CalendarDay,
    selectedMonth: {
        monthName: string,
        monthIndex: number,
        monthNumber: number,
        year: number,
        getDay: (dayNum: number) => CalendarDay,
        createMonthDays: ()=>CalendarDay[];
    },
    selectedYear: number,
    selectedYearsInterval: number[],
};
