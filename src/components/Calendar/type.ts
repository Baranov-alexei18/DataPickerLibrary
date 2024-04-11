export type CalendarProps = {
    isOpen: boolean;
    locale?: string;
    selectedDate: Date;
    selectedRange: [Date | null, Date | null] | undefined;
    closeCalendar: () => void;
    clearDate?: () => void;
    openTodo?: (date: Date) => void;
    selectDate?: (date: Date) => void;
    selectRange?: (date: Date) => void,

}
