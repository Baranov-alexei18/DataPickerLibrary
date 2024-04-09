export type CalendarProps = {
    isOpen: boolean;
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void;
}
