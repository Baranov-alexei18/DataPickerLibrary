import { CalendarFunctionsType } from './calendarFunction';
import { CalendarStateType } from './calendarState';

export type CalendarType = {
    state: CalendarStateType,
    functions: CalendarFunctionsType
}

export type CalendarContextType = {
    isFirstWeekDayMonday?: boolean,
    state: CalendarStateType,
    functions: CalendarFunctionsType,
    minDate: Date;
    maxDate: Date;
    holidayColor: string;
    holiday: boolean;
    selectedDate: string;
    selectedRange: [Date | null, Date | null];
    isOpen: boolean;
    clearDate: () => void;
}

export type UseCalendarType = {
    locale?: string;
    selectedDate: Date;
    firstWeekDayNumber?: number;
}
