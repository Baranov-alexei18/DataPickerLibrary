import { CalendarFunctionsType } from './CalendarFunctions';
import { CalendarStateType } from './CalendarState';

export type CalendarType = {
    state: CalendarStateType,
    functions: CalendarFunctionsType
}

export type CalendarContextType = {
    state: CalendarStateType,
    functions: CalendarFunctionsType,
    minDate: Date;
    maxDate: Date;
    holidayColor: string;
    holiday: boolean
}
