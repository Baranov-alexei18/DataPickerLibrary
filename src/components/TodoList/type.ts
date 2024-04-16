export type TodoListProps = {
    onClose: () => void,
    selectedDate: Date | null,
}
export type TodoItem = {
    id: number,
    text: string | null,
    date: Date,
}
export type TodosList = {
    [date:string]: TodoItem
}
