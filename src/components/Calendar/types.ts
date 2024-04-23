import { HolidayApiType } from '@/types/holiday';

export type CalendarProps = {
    isFirstWeekDayMonday: boolean;
    isOpen: boolean;
    locale: string;
    selectedDate: string;
    selectedRange: [Date | null, Date | null] | undefined;
    closeCalendar: () => void;
    clearDate: () => void;
    openTodo: (date: Date) => void;
    selectDate: (date: Date) => void;
    selectRange: (date: Date) => void,
    holidays: HolidayApiType[]
};

export type CalendarConfig = {
    holiday: boolean;
    holidayColor: string;
    minDate: Date;
    maxDate: Date;
};

export type CalendarServiceType = CalendarConfig | (CalendarConfig & CalendarProps);
