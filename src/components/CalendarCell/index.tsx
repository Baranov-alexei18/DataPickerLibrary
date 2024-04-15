import React, { FC, useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { DayViewProps } from '@/types';
import { CalendarContextType } from '@/types/calendar';
import { CalendarDay } from '@/types/calendar/CalendarState';
import {
  checkIsToday,
  isAdditionalDay,
  isDateInRange,
  isHoliday,
  isSelectedDay,
  isWeekend,
} from '@/utils/Calendar/checkDate';
import { hasTodoForDay } from '@/utils/Calendar/getTodoForDay';

import classes from './styles.module.scss';

type CalendarCellType = {
    dayCell: CalendarDay;
}

export const CalendarCell: FC<CalendarCellType> = ({ dayCell }) => {
  const { dayNumber, date } = dayCell;

  const {
    state,
    functions,
    minDate,
    maxDate,
    holiday,
    selectDate,
    selectRange,
    openTodo,
    holidays,
    holidayColor,
    selectedRange,
    selectedDate,
  } = useContext(CalendarContext) as CalendarContextType & DayViewProps;

  const isViewHoliday = (day: CalendarDay): boolean => {
    const holidayDay = isHoliday(date, holidays!, holiday)
      && !isSelectedDay(day, state.selectedDay.date);
    return holiday && (holidayDay || isWeekend(day));
  };

  const handleDayClick = (day: CalendarDay) => {
    if (isDateInRange(date, maxDate, minDate) && toogleSelectedDay) {
      functions.setSelectedDay(day);
      toogleSelectedDay(date);
    }
  };

  const handleRightMouseClick = (e:React.MouseEvent<HTMLDivElement>, date: Date) => {
    e.preventDefault();
    if (isDateInRange(date, maxDate, minDate)) {
      openTodo!(date);
    }
  };

  const toogleSelectedDay = (date: Date) => {
    if (selectDate) {
      selectDate(date);
    }
    if (selectRange) {
      selectRange(date);
    }
  };

  return (
    <div
      data-testid="calendar-cell"
      aria-hidden
      onClick={() => handleDayClick(dayCell)}
      onContextMenu={(e) => handleRightMouseClick(e, date)}
      className={[
        classes.calendar_day,
        checkIsToday(date) ? classes.calendar_today : '',
        isAdditionalDay(dayCell, state.selectedMonth.monthIndex) ? classes.additional_day : '',
        !isDateInRange(date, maxDate, minDate) ? classes.disabled_day : '',
        selectedRange && selectedRange[0]?.toDateString() === date.toDateString() ? classes.start_range : '',
        selectedRange && selectedRange[1]?.toDateString() === date.toDateString() ? classes.end_range : '',
        selectedRange && isDateInRange(date, selectedRange[1]!, selectedRange[0]!, true)
                && classes.selected_range,
        selectedDate && isSelectedDay(dayCell, state.selectedDay.date) ? classes.select_day : '',
      ].join(' ')}
      style={{ backgroundColor: isViewHoliday(dayCell) ? holidayColor : '' }}
    >
      {dayNumber}
      {hasTodoForDay(date) && (
        <div className={classes.has_todolist} />
      )}
    </div>
  );
};
