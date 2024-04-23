import React from 'react';

import { CalendarDay } from './calendarDay';

export type CalendarFunctionsType = {
    onClickArrow: (direction: 'right' | 'left') => void,
    setMode: React.Dispatch<React.SetStateAction<'days' | 'monthes' | 'years'>>,
    setSelectedDay: React.Dispatch<React.SetStateAction<CalendarDay>>,
    setSelectedMonthByIndex:(monthIndex: number, year?: number) => void,
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>,
    setSelectedYearsInterval: React.Dispatch<React.SetStateAction<number[]>>,
}
