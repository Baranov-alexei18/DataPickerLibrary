import React, { FC, useContext } from 'react';
import classNames from 'classnames/bind';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarContextType } from '@/types/calendar';
import { CalendarDay, DayViewProps } from '@/types/calendar/calendarDay';
import {
  checkIsToday,
  isAdditionalDay,
  isDateInRange,
  isHoliday,
  isSelectedDay,
  isWeekend,
} from '@/utils/Calendar/checkDate';
import { hasTodoForDay } from '@/utils/Calendar/getTodoForDay';

import { CalendarCellType } from './types';

import classes from './styles.module.scss';

const cx = classNames.bind(classes);

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

  const handleDayClick = (day: CalendarDay) => () => {
    if (isDateInRange(date, maxDate, minDate) && toogleSelectedDay) {
      functions.setSelectedDay(day);
      toogleSelectedDay(date);
    }
  };

  const handleRightMouseClick = (date: Date) => (e:React.MouseEvent<HTMLDivElement>) => {
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

  const className = cx({
    calendar_day: true,
    calendar_today: checkIsToday(date),
    additional_day: isAdditionalDay(dayCell, state.selectedMonth.monthIndex),
    disabled_day: !isDateInRange(date, maxDate, minDate),
    start_range: selectedRange && selectedRange[0]?.toDateString() === date.toDateString(),
    end_range: selectedRange && selectedRange[1]?.toDateString() === date.toDateString(),
    select_range: selectedRange && isDateInRange(date, selectedRange[1]!, selectedRange[0]!, true),
    select_day: selectedDate && isSelectedDay(dayCell, state.selectedDay.date),
  });

  return (
    <div
      data-testid="calendar-cell"
      aria-hidden
      onClick={handleDayClick(dayCell)}
      onContextMenu={handleRightMouseClick(date)}
      className={className}
      style={{ backgroundColor: isViewHoliday(dayCell) ? holidayColor : '' }}
    >
      {dayNumber}
      {hasTodoForDay(date) && (
        <div className={classes.has_todolist} />
      )}
    </div>
  );
};
