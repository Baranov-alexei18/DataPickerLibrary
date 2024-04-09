export type DateFieldProps = {
    value: string | undefined;
    className: string;
    onChange: (value: string) => void;
    onClear: () => void;
    onFocus: () => void;
}
