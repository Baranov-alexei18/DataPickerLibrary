export type firstWeekDayType = 2 | 1;

type holidayApiType = {
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
    holidays?: holidayApiType[];
    selectedRange: [Date | null, Date | null] | undefined;
    openTodo?: (date:Date) => void;
}
