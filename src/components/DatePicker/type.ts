export type DatePickerProps = {
    value: string;
    minDate?: Date;
    maxDate?: Date;
    holiday?: boolean,
    holidayColor: string,
    onChange: (value: string) => void;
    isFirstWeekDayMonday?: boolean;
}
