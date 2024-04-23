import { HolidayApiType } from '../holiday';

export type CalendarDay = {
    date: Date;
    dayNumber: number;
    day: string;
    dayNumberInWeek: number;
    dayShort: string;
    year: number;
    yearShort: string;
    month: string;
    monthShort: string;
    monthNumber: number;
    monthIndex: number;
    timestamp: number;
    week: number;
}

export type DayViewProps = {
    selectDate?: (date: Date) => void;
    selectRange?: (date: Date) => void;
    openTodo?: (date: Date) => void;
    holidays?: HolidayApiType[];
    selectedDate?: string;
}
