export type DatePickerProps = {
    value: string;
    onChange: (value: string) => void;
    minDate?: Date;
    maxDate?: Date;
    holiday?: boolean,
    holidayColor?: string,
    isFirstWeekDayMonday?: boolean;
}
