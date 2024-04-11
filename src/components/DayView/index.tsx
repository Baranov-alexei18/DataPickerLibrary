import React, { memo, useContext } from 'react';

import { TODO_STORAGE_KEY } from '@/constants';
import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarContextType } from '@/types/calendar';
import { CalendarDay } from '@/types/calendar/CalendarState';
import { checkDateIsEqual, checkIsToday } from '@/utils/Calendar';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';
import { getDataFromContext } from '@/utils/getDataFromContext';

import { DayViewProps } from '../../types';
import classes from './styles.module.scss';

export const DayView = memo(({
  selectDate, holidays, selectedRange, openTodo,
}: DayViewProps) => {
  const calendarContext = useContext(CalendarContext);
  const {
    state, functions, minDate, maxDate, holiday, holidayColor,
  } = getDataFromContext(calendarContext) as CalendarContextType;

  const isToday = (day: CalendarDay) => checkIsToday(day.date);
  const isSelectedDay = (day: CalendarDay) => checkDateIsEqual(day.date, state.selectedDay.date);
  const isAdditionalDay = (day: CalendarDay) => day.monthIndex !== state.selectedMonth.monthIndex;

  const isDateInRange = (date: Date): boolean => date >= minDate && date <= maxDate;

  const isWeekend = (day: CalendarDay): boolean => {
    const dayOfWeek = day.date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isHoliday = (dateHoliday: Date): boolean => {
    if (!holiday) return false;

    const matchingHoliday = holidays!.find(({ date }) => {
      const holidayDate = new Date(date);
      return (
        holidayDate.getFullYear() === dateHoliday.getFullYear()
        && holidayDate.getMonth() === dateHoliday.getMonth()
        && holidayDate.getDate() === dateHoliday.getDate()
      );
    });

    return !!matchingHoliday;
  };

  const isViewHoliday = (day: CalendarDay): boolean => {
    const holidayDay = isHoliday(day.date) && !isSelectedDay(day);
    const weekend = isWeekend(day) && !isSelectedDay(day);
    return holiday && (holidayDay || weekend);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (isDateInRange(day.date) && selectDate) {
      functions.setSelectedDay(day);
      setTimeout(() => {
        selectDate(day.date);
      }, 0);
    }
  };
  const isInRange = (day: CalendarDay): boolean => {
    if (!selectedRange || !selectedRange[0] || !selectedRange[1]) return false;
    const isToRange = day.date > selectedRange[0] && day.date < selectedRange[1];
    return isToRange;
  };

  const handleDoubleClick = (day: CalendarDay) => {
    openTodo!(day.date);
  };

  const hasTodoForDay = (date: Date): boolean => {
    const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)!) || [];
    return storedTodos[formatDateToString(date)];
  };

  return (
    <>
      <div className={classes.week_names}>
        {state.weekDaysNames.map((weekDaysName) => (
          <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
        ))}
      </div>
      <div className={classes.table_days}>
        {state.calendarDays.map((day) => (
          <div
            key={`${day.dayNumber}-${day.monthIndex}`}
            aria-hidden
            onClick={() => handleDayClick(day)}
            onDoubleClick={() => handleDoubleClick(day)}
            className={[
              classes.calendar_day,
              isToday(day) ? classes.calendar_today : '',
              isSelectedDay(day) ? classes.select_day : '',
              isAdditionalDay(day) ? classes.additional_day : '',
              !isDateInRange(day.date) ? classes.disabled_day : '',
              selectedRange && selectedRange[0]?.toDateString() === day.date.toDateString() ? classes.start_range : '',
              selectedRange && selectedRange[1]?.toDateString() === day.date.toDateString() ? classes.end_range : '',
              selectedRange && isInRange(day) && classes.selected_range,
            ].join(' ')}
            style={{ backgroundColor: isViewHoliday(day) ? holidayColor : '' }}
          >
            {day.dayNumber}
            {hasTodoForDay(day.date) && (
              <div className={classes.has_todolist} />
            )}
          </div>
        ))}
      </div>
    </>
  );
});
