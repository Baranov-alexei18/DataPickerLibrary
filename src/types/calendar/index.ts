import { CalendarFunctionsType } from './CalendarFunctions';
import { CalendarStateType } from './CalendarState';

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
}
