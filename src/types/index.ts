export type firstWeekDayType = 2 | 1;

export type holidayApiType = {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string | null;
    launchYear: null;
    type: string;
}

export type DayViewProps = {
    selectDate?: (date: Date) => void;
    selectRange?: (date: Date) => void;
    holidays?: holidayApiType[];
    openTodo?: (date: Date) => void;
    selectedDate?: string;
}

export type UseCalendarType = {
    locale?: string;
    selectedDate: Date;
    firstWeekDayNumber?: number;
  }
